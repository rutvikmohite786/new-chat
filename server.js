var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server, {
    cors: {
        origin: "http://127.0.0.1:8000",
        methods: ["GET", "POST"]
    }
});

const users = {};
server.listen(3000);
io.on('connection', function (socket) {
    console.log("Server Running...");
    console.log(socket.id);

    socket.on('login', function (data) {
        console.log('User: ' + data.userId + ' connected');
        // saving userId to object with socket ID
        users[socket.id] = data.userId;
        io.emit('user_connected', users);
    });

    console.log("new client connected");

    socket.on('disconnect', function () {
        console.log('User: ' + users[socket.id] + ' disconnected');
        io.emit('user_disconnected', users[socket.id]);
        delete users[socket.id];
    });

    socket.on('connect_error', function (err) {
        console.log(err.message);
    });

});
io.on('connect_error', function (err) {
    console.log('this is error-- ' + err.message);
});