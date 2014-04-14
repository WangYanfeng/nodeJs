var  connection = require('../database').getConnect();

function  User(user,time) {
    this.name = user.name;
    this.password = user.password;
    if (time) {
        this.time = time;
    } else {
        this.time =  new Date ();
        console.log(this.time);
    }
}

module.exports = User;
//新增用户
User.prototype.save = function  save(callback) {
    // 用户对象
    var  user = {
        name: this.name,
        password: this.password,
        time:this.time
    };
    //插入数据库
    var sql ="insert into user (name,password,in_time) values(?,?,?)";   
    connection.query(sql,[user.name,user.password,user.time],function(err,results,fields){
        if (err) {
            throw callback(err);
        } else {
            //返回用户id
            return callback(err, results[0]);
        }
    });
};
//获取用户
User.get =  function  get(username, callback) {
    // 读取 users 集合
    var sql = "select u.name,u.password from user u where u.name='"+username+"'";
    connection.query(sql,function(err,results){
        if(err){
            throw err;
        }else{
            callback(err,results[0]);
        }
    })
};