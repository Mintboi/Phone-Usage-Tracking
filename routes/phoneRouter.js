const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const report = require('../models/phoneUsage'); 
const phoneRouter = express.Router();



// Routes to the edit or delete page allowing a user to change or delete previous reports
//ID Passed from database objects to report list, allowing user to update or delete reports without having to enter the ID
phoneRouter.route('/editOrDelete')
    .get((req, res, next) => {
        report.find()
            .then((reportsfound) => {
                res.render('editOrDelete', { "reportList": reportsfound, title: 'edit or Delete your reports' });
            }, (err) => next(err))
            .catch((err) => next(err));   
    })

    .post((req, res, next) => {
        report.findById(req.body.id)
            .then((reportfound) => {
                res.render("editPage", { "report": reportfound, title: "Editing reports" });
            }, (err) => next(err))
            .catch((err) => next(err));
    })

// Routes to the form page in which the user can enter the values they wish to modify in their report
// which is passed through the Schema and updates the report with that exclusive ID
phoneRouter.route('/edit')
    .post((req, res, next) => {
        report.findByIdAndUpdate(req.body.id, req.body).then(
            report.find()
            .then((reportfound) => {
                res.redirect("/phones/editOrDelete");
            }, (err) => next(err))
            .catch((err) => next(err)));
    })
phoneRouter.route("/delete")
    .post((req, res, next) => {
        report.findByIdAndDelete(req.body.id).then(
            report.find())
        .then((reportfound) => {
            res.redirect("/phones/editOrDelete");
        }, (err) => next(err))
        .catch((err) => next(err)); });


//renders the new report form and passes the values into the database
phoneRouter.route('/create')
.get((req,res,next) => {
    res.render('newreport.ejs', { title: 'New Report' });   
})
    .post((req, res, next) => {
        console.log(req.body.name)
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

// Routes to the report creation page in which a user can view multiple days worth of reports and
// Allows users to see a graph of their usage, with accurate values and randomized colors
phoneRouter.route('/dailyAverage')
    .get((req, res, next) => {
        res.render('Report.ejs', { title: 'Average Report' });
    })
    .post((req, res, next) => {
        report.find({ name: { $regex: req.body.name}, createdAt:{ $gte:(req.body.startDate), $lte:(req.body.endDate) } })
            .then((reportsfound) => {
                var dailyAverage = [];
                const colorList = [];
                const dateList = [];
                var total = 0;
                for (var i = 0; i < reportsfound.length; i++) {
                    colorList.push(Math.floor(Math.random() * 16777215).toString(16));
                    total += reportsfound[i].shopping + reportsfound[i].browsing + reportsfound[i].education;
                    dateList.push(reportsfound[i].createdAt);
                    dailyAverage.push(reportsfound[i].shopping + reportsfound[i].browsing + reportsfound[i].education / 3)
                }
                res.render('Report-graph.ejs', {"reportList": reportsfound,
                    'dailyAverage': dailyAverage, "total": total,
                    "colorList": colorList, "dateList": dateList, title: 'Average Report'
                });
            })
    })

//routing for non-functional ejs pages
phoneRouter.route('/help')
    .get((req, res, next) => {
        res.render('helppage', {title: 'Help' });
    })

phoneRouter.route('/contactUs')
    .get((req, res, next) => {
        res.render('contactus', {title: 'Contact Us' });
    })

module.exports = phoneRouter;