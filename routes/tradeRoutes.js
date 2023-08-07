const express = require('express');
const controller = require('../controllers/tradeController');
const {isLoggedIn, isAuthor} = require('../middlewares/auth');
const {validateId} = require('../middlewares/validator');

const router = express.Router();

//GET /trades: send all trades to the user
router.get('/', controller.trades);

//GET /trades/new: send html form for creating a new trade
router.get('/new', isLoggedIn, controller.new);

//POST /trades: create a new trade
router.post('/', isLoggedIn, controller.create);

//GET /trades/:id: send details of trade identified by id
router.get('/:id', validateId, controller.show);

//GET /trades/:id/edit: send html form for editing an existing trade
router.get('/:id/edit', isLoggedIn, isAuthor, validateId, controller.edit);

//PUT /trades/:id: update the trade identified by id
router.put('/:id', isLoggedIn, isAuthor, validateId, controller.update);

//DELETE /trades/:id: delete the trade identified by id
router.delete('/:id', isLoggedIn, isAuthor, validateId, controller.delete);

module.exports = router;