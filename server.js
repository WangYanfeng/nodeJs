var express = require('express');
var ejs=require('ejs');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var socketIO=require('socket.io');

var app = express();

var flash = require('connect-flash');
var socket= require('./socket');

app.configure(function (){
  app.use(express.bodyParser()); 
  app.use(express.methodOverride()); 
  app.use(flash());
  app.use(express.cookieParser()); //cookie解析的中间件
  app.use(express.session({
    secret: "wangyanfeng_iTraffic",
	cookie : {
			maxAge : 60000 * 20	//20 minutes
		}
  }));

  app.use(express. static (__dirname + '/public')); 
});
//app.dynamicHelpers
app.use(function(req, res, next){
  var error = req.flash('error');
  var success = req.flash('success');
  res.locals.user = req.session.user;
  res.locals.error = error.length ? error : null;
  res.locals.success = success ? success : null;
  next();
});

// all environments
app.set('port', 18080);
app.set('views', path.join(__dirname, 'views'));

app.engine('.html', ejs.__express);
app.set('view engine', 'html');//app.set('view engine', 'ejs');

app.use(express.favicon());   //Use the given middleware
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

routes(app);//路由配置

var server=http.createServer(app);

var io=socketIO.listen(server);
socket(io);//执行socket.js里面的内容

server.listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});