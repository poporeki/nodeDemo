var express = require('express');
var router = express.Router();
var usesql=require('../db/use')
var path = require('path');  

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '京东商城'});
});
router.get('/getCity',function(req,res,next){
  usesql.city(req,res,next);

})

module.exports = router;
