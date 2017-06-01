var mysql = require('mysql'),
    $conf = require('./DBconfig'),
    $sql = require('./useSql');

var pool = mysql.createPool($conf.mysql);

var jsonWrite = function (res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
}


module.exports = {
    user: {
        login:function(req,res,next){
            pool.getConnection(function(err,conn){
                var param=req.body;

                conn.query($sql.operateUser.login,[param.name,param.pwd],function(err,result){
                    if(result==1){
                        console.log('登录成功')
                    }
                })
            })
        },
        add: function (req, res, next) {
            pool.getConnection(function (err, conn) {
                var param = req.query || req.param;

                conn.query($sql.operateUser.insert, [param.name, param.age, param.sex], function (err, result) {
                    if (result) {
                        result = {
                            code: 200,
                            msg: '增加成功'
                        };
                    }
                    jsonWrite(res, result);
                    conn.release();
                })
            })
        },
        delete: function (req, res, next) {
            pool.getConnection(function (err, conn) {
                var param = req.query || req.param;


            })
        },
        queryAll: function (req, res, next) {
            pool.getConnection(function (err, conn) {
                conn.query($sql.operateUser.queryAll, function (err, result) {
                    jsonWrite(res, result);
                    conn.release();
                })
            })
        }
    },
    city:function(req,res,next){
        pool.getConnection(function (err, conn) {
                conn.query($sql.getCity, function (err, result) {
                    jsonWrite(res, result);
                    conn.release();
                })
            })
    },
    getMenu:function(){

    }

}