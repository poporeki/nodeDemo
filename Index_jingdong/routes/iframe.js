var express=require('express');
var router=express.Router();
var path=require('path');

router.get('/:content',function(req,res,next){
    var _cnt=req.params.content;
    
    res.render(_cnt);
});
module.exports=router;