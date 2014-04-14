var settings = require('./setting');

var mysql = require('mysql');

var connection;
exports.getConnect=function(){
    connection = mysql.createConnection({
        host: 'localhost',     //本地数据库
        port: 3306,
        user: 'root',          //数据库用户名
        password: '',          //数据库密码
        database: 'itraffic'  //数据库名称
    });
    connection.connect();
    return connection;
}
