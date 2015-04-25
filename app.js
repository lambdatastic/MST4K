// Require dependencies
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var vidStreamer = require('vid-streamer');

// Define main route
app.use(express.static(__dirname + '/public'));
app.get('/videos/', vidStreamer);

io.on('connection', function(socket) {
  socket.on('message', function(data) {
    console.log('incoming message: ', data);
    socket.broadcast.emit('message', data);
  });

  socket.on('movie:play', function(data) {
    console.log('playing video');
    socket.broadcast.emit('movie:play', data);
  });

  socket.on('movie:pause', function(data) {
    console.log('pausing video');
    socket.broadcast.emit('movie:pause', data);
  });

  socket.on('movie:sync', function(data) {
    console.log('syncing video');
    socket.broadcast.emit('movie:sync', data);
  });
});


http.listen(8080);

