function index(_req, res) {
  res.render('home', { title: 'Zion Real Estate Intelligence' });
}

module.exports = { index };
