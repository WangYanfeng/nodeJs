module.exports = function(io){
	//存储在线用户列表
	var users = [];
	io.sockets.on('connection',function(socket){
		socket.on('online',function(data){
 		    //将上线的用户名存储为socket对象的属性,以区分每个socket 对象，方便后面使用
		    socket.name = data.user;
		    //数组中不存在该用户名则插入该用户名
		    if(users.indexOf(data.user) == -1){
		    	users.unshift(data.user);//在数组的开头插入新元素。
		    }
		   //向所有用户广播该用户上线信息
		   io.sockets.emit('online',{user:data.user});
		   //socket.broadcast.emit();
		});
		socket.on('disconnect',function(){
			console.log("*******"+socket.name+"disconnect");
			if(users.indexOf(socket.name)!=-1){
				users.splice(users.indexOf(socket.name),1);
				socket.broadcast.emit('offline',{user:socket.name});
			}
		})
		socket.on('message',function(data){
			if(users.indexOf(socket.name)!=-1){
				io.sockets.emit('message',{user:socket.name,msg:data.msg});
			}
		});
	});



};