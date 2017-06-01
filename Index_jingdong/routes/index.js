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
router.post('/loginCheck',function(req,res,next){
  usesql.user.login(req,res,next);
})

module.exports = router;
