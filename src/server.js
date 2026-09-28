require('dotenv').config();
const express = require('express');
const path = require('path');
const { getEnv } = require('./config/env');
const publicRoutes = require('./routes/public.routes');
const { errorHandler, notFound } = require('./middleware/error.middleware');

const env = getEnv();
const app = express();
app.disable('x-powered-by');
app.locals.presentation = require('./lib/presentation');
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-Frame-Options', 'DENY');
  next();
});
app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(publicRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(env.port, () => console.log(`Zion is running at http://localhost:${env.port}`));
