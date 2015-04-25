// Require dependencies
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Define main route
app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket) {
  socket.on('chat message', function(data) {
    console.log('incoming message');
    socket.broadcast.emit('chat message', data);
  });
});

http.listen(8080);
