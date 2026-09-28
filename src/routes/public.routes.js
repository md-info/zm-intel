const express = require('express');
const homeController = require('../controllers/home.controller');
const propertyController = require('../controllers/property.controller');
const developmentController = require('../controllers/development.controller');
const companyController = require('../controllers/company.controller');
const researchController = require('../controllers/research.controller');

const router = express.Router();
router.get('/', homeController.index);
router.get('/properties', propertyController.index);
router.get('/properties/:id', propertyController.show);
router.get('/developments/:id', developmentController.show);
router.get('/pipeline', developmentController.pipeline);
router.get('/companies/:id', companyController.show);
router.get('/case-studies/:slug', researchController.showCaseStudy);
router.get('/methodology', researchController.methodology);

module.exports = router;
