const companyService = require('../services/company.service');

async function show(req, res, next) {
  try {
    const company = await companyService.getCompany(req.params.id);
    res.render('companies/show', { title: company.company_name, company });
  } catch (error) { next(error); }
}

module.exports = { show };
