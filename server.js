
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
var arry = []
io.on('connection', async function (socket) {
  
    console.log("Server Running...");
    // console.log(socket.id);
    // arry.push(socket.id)

    // console.log(arry,'jhjhjhhj')
    arry = []

    const sockets = await io.fetchSockets();
    for (const socket of sockets) {
        console.log(socket.id);
        arry.push(socket.id)
        //io.to(socket.id).emit('message', 'for your eyes only');
    }



    // console.log(arry)

    function removeDuplicates(arry) {
        return arry.filter((item,
            index) => arry.indexOf(item) === index);
    }
    console.log(removeDuplicates(arry));



    // socket.on('create', function (room) {
    //     console.log(room)
    //     socket.nickname = 'Earl';
    //     socket.join(room);
    // });

    // var roster = io.of('/').in('room1').clients;
    // console.log(roster)

    // roster.forEach(function (client) {
    //     console.log('Username: ' + client.nickname);
    // });
    

    //socket.join("room1");
    // socket.room = 'room1';

    var a = io.sockets.adapter.rooms.get('room1')
    if(a){
        if(a.size<2){
            socket.join("room1");
            console.log('enter')
            io.to("room1").emit('message', 'for your eyes only 1');
        }
    }else{
        socket.join("room1");
    }    

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

