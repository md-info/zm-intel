const propertyService = require('../services/property.service');

async function index(req, res, next) {
  try {
    const filters = {
      term: req.query.q || '',
      municipality: req.query.municipality || '',
      propertyTypeId: req.query.propertyType || '',
      statusId: req.query.status || '',
    };
    const [properties, filterOptions] = await Promise.all([
      propertyService.listProperties(filters),
      propertyService.getPropertyFilters(),
    ]);
    res.render('properties/index', { title: 'Properties', properties, filters, ...filterOptions });
  } catch (error) { next(error); }
}

async function show(req, res, next) {
  try {
    const property = await propertyService.getProperty(req.params.id);
    res.render('properties/show', { title: property.property_name || property.address_line_1, property });
  } catch (error) { next(error); }
}

module.exports = { index, show };
