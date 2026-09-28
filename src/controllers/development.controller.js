const developmentService = require('../services/development.service');

async function show(req, res, next) {
  try {
    const development = await developmentService.getDevelopment(req.params.id);
    res.render('developments/show', { title: development.project_name || 'Development', development });
  } catch (error) { next(error); }
}

async function pipeline(req, res, next) {
  try {
    res.render('developments/pipeline', { title: 'Development Pipeline', pipeline: await developmentService.getPipeline() });
  } catch (error) { next(error); }
}

module.exports = { pipeline, show };
