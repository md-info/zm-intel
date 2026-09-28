function notFound(_req, res) {
  res.status(404).render('error', { title: 'Page not found', message: 'That page does not exist.' });
}

function errorHandler(error, _req, res, _next) {
  console.error(error);
  const status = error.code === 'PGRST116' ? 404 : 500;
  res.status(status).render('error', {
    title: status === 404 ? 'Not found' : 'Something went wrong',
    message: status === 404 ? 'We could not find that record.' : 'Please try again shortly.',
  });
}

module.exports = { errorHandler, notFound };
