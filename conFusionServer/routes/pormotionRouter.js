const express = require('express');
const bodyParser = require('body-parser');

const pormotionRouter = express.Router();
const Pormotions = require("../models/pormo");
pormotionRouter.use(bodyParser.json());

pormotionRouter.route('/')
.get((req,res,next) => {
    Pormotions.find({})
    .then((pormotions)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(pormotions);
    },(err)=>next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Pormotions.create(req.body)
    .then((pormotion) => {
        console.log('Pormotion Created ', pormotion);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(pormotion);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})
.delete((req, res, next) => {
    Pormotions.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));   
});

pormotionRouter.route('/:pormotionId')
.get((req,res,next) => {
    Pormotions.findById(req.params.pormotionId)
    .then((pormotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(pormotion);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /pormotion/'+ req.params.pormotionId);
})
.put((req, res, next) => {
    Pormotions.findByIdAndUpdate(req.params.pormotionId, {
        $set: req.body
    }, { new: true })
    .then((pormotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(pormotion);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Pormotions.findByIdAndRemove(req.params.pormotionId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = pormotionRouter;