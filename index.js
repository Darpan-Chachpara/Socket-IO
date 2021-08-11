const { Socket } = require('dgram');
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, { cors: { origin: "*"}})


app.set('view engine', 'ejs'); // view file extension

app.get('/home', (req,res) => {
    res.render('home') // file name on which it wil render
});

server.listen(3001, () => {
    console.log("Server running...");
});

//All the logic in io.on 
io.on("connection", (socket) => {
    console.log("User connected: " + socket.id);

    socket.on("message", (data) => { // on will receive the message
        // console.log(data);
        socket.broadcast.emit('message', data) // emit will give respsonse on the borwser but to login client only
    });// broadcast will give message to each and every individual leaving ourself
});