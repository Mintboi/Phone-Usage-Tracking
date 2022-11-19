const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const report = require('../models/phoneUsage');

/* GET home page. */
router.get('/', function (req, res, next) {
    report.find().then((reportsfound) => {
        res.render('index', { 'reportList': reportsfound, title: 'Index' });
    })});

module.exports = router;
