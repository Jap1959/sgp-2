const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
console.log("inside pages");
const authController = require('../controller/auth');
const dataController = require('../controller/data');
console.log("HII");
router.get('/', authController.userlogined);

router.get('/login', (req, res) => {
  res.render('login');
});
router.get('/forget-password', (req, res) => {
  res.render('forget-password');
});
router.get('/index-logout', (req, res) => {
  res.render('index-logout');
});
router.get('/explore',dataController.search);
router.get('/search', dataController.search);
router.get('/aboutus', (req, res) => {
  res.render('aboutus');
});
router.get('/description',dataController.addreview);

router.get('/results',dataController.data);
router.get('/addreview', dataController.addreview);
router.get('/sinuppage', (req, res) => {
  res.render('sinuppage');
});

module.exports = router;
