var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
	
	socket.on('create', (room) => {
      console.log(`Socket ${socket.id} joining ${room}`);
      socket.join(room);
   });
	
	
  socket.on('chat', (msg, room) => {
    //console.log(`msg: ${message}, room: ${room}`);
	io.to(room).emit('chat', msg);
  });
  
  socket.on('current position', (msg, room) => {
    console.log('current time ' + msg);
	io.to(room).emit('current position', msg);
	});
	
  socket.on('pause', (msg, room) => {
    console.log('pause');
	io.to(room).emit('pause', msg);
  });
  
  socket.on('unpause', (msg, room) => {
    console.log('unpause');
	io.to(room).emit('unpause', msg);
  });
});


http.listen(3000, () => {
  console.log('listening on *:3000');
});