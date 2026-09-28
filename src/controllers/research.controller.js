const researchService = require('../services/research.service');

async function showCaseStudy(req, res, next) {
  try {
    const article = await researchService.getArticleBySlug(req.params.slug);
    res.render('research/show', { title: article.title, article });
  } catch (error) { next(error); }
}

function methodology(_req, res) {
  res.render('methodology', { title: 'Methodology' });
}

module.exports = { methodology, showCaseStudy };
