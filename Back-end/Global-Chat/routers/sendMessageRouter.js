const express = require('express');
const isLoggedIn = require('../middlewares/isLoggedIn');
const router = express.Router();
const {loginController, validateEmailController, sigupController} = require('../controllers/authController');
const { messageController } = require('../controllers/messageController');

router.post('/signup', sigupController);

router.post('/login', loginController);

router.post('/chat/message/:id', isLoggedIn, messageController);

module.exports = router;