
const express = require('express');
const router = express.Router();
const authController=require('../controller/auth');
router.post('/singup',authController.singup);
router.post('/addreview',authController.addreview);
router.post('/Reset-password',authController.resetpassword);
router.post('/login',authController.login);
module.exports = router;
