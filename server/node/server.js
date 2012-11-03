var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

var port = process.env.PORT || 5000;

app.listen(port, function() {
  console.log("Listening on " + port);
});

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

// app.configure(function() {
//     app.use('/static', express.static(__dirname + '/public'));
//     app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
// })

// app.use('/static', express.static(__dirname + '/static'));

io.sockets.on('connection', function (socket) {  
  socket.on('source', function (data) {
  	//{ htmlfile: '< ... > ' }
  	socket.broadcast.emit('source', data);
    console.log(data.htmlfile);
  });
});