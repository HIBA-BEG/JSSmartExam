const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');





router.post('/signUp' , AuthController.signUp);
router.post('/login' , AuthController.login);
router.post('/logout' , AuthController.logout);
router.post('/StudentLogin' , AuthController.studentLogin);


module.exports = router;