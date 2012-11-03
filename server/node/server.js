var port = process.env.PORT || 5000;

var io = require('socket.io').listen(port);


io.sockets.on('connection', function (socket) {  
  socket.on('source', function (data) {
  	//{ htmlfile: '< ... > ' }
  	socket.broadcast.emit('source', data);
    console.log(data.htmlfile);
  });
});