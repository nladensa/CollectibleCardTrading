const express = require('express');
const controller = require('../controllers/mainController');

const router = express.Router();

//GET /home
router.get('/', controller.index);

//GET /contact
router.get('/contact', controller.contact);

//GET /about
router.get('/about', controller.about);

module.exports = router;