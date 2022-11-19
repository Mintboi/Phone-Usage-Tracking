const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const report = require('../models/phoneUsage'); 

const phoneRouter = express.Router();

phoneRouter.route('/editOrDelete')
    .get((req, res, next) => {
        res.render('editOrDelete', { title: 'edit or Delete your reports' });
    })

    .post((req, res, next) => {
        report.findOne(req.body)
            .then((reportfound) => {
                res.render("editPage", { "report": reportfound, title: "Editing reports" });
            }, (err) => next(err))
            .catch((err) => next(err));
    })


phoneRouter.route('/create')
.get((req,res,next) => {
    res.render('newreport.ejs', { title: 'New Report' });   
})

.post((req, res, next) => {
    report.create(req.body)
    .then((reportscreated) => {
        report.find()
            .then((reportsfound) => {
                res.render('currentreport',{'reportList' : reportsfound, title:'All reports'} );
        }, (err) => next(err))
    .catch((err) => next(err));
    }, (err) => next(err))
    .catch((err) => next(err));
})

.put((req, res, next) => {
    res.statusCode = 403;
    res.end('You cannot edit on this page');
})

.delete((req, res, next) => {
    res.statusCode = 403;
    res.end('You cannot edit on this page');
    
});


phoneRouter.route('/help')
    .get((req, res, next) => {
        res.render('helppage', {title: 'Help' });
    })


phoneRouter.route('/contactUs')
    .get((req, res, next) => {
        res.render('contactus', {title: 'Contact Us' });
    })

module.exports = phoneRouter;