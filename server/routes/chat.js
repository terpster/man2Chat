const express = require('express');
const router = express.Router();
const config = require('../../config/database');
const Message = require('../../models/message');
const Chatroom = require('../../models/chatroom');
const io = require('../../server');


// Send message
router.post('/send-message', (req, res, next) => {
    let newMsg = new Message({
        name: req.body.name,
        message: req.body.message,
        chatroom: req.body.chatroom
    });

    Message.addMessage(newMsg, (err, msg) => {
        if(err){
            res.json({success: false, msg: 'Failed to save message'});
        } else{
            res.json({success: true, msg: 'Message saved'});
            router.notifyclients(newMsg.chatroom);
        }
    })
});

router.post('/create-chatroom', (req, res, next) => {
    let newRoom = new Chatroom({
        name: req.body.name,
        owner: req.body.owner
    });

    Chatroom.addChatroom(newRoom, (err, msg) => {
        if(err){
            res.json({success: false, msg: 'Failed to create room'});
        } else{
            res.json({success: true, msg: 'Room has been created'});
            router.notifyClientsAboutRooms();
        }
    })
});

router.foo = function(req, res) {
  const io = req.app.get('socketio');
  console.log(io);
};

router.clients = [];
router.addClient = function (client) {
    router.clients.push(client);
    router.notifyclients();
    console.log('Connected: %s sockets connected', router.clients.length);
};
router.notifyclients = function (currentRoom) {
    Message.find({ chatroom: currentRoom }).exec(function (err, messages) {
        if (err)
            return console.error(err);

        io.in(currentRoom).emit('refresh messages', messages);
    });
};
router.notifyClientsAboutRooms = function () {
    Chatroom.find({}).exec(function (err, rooms) {
        if (err)
            return console.error(err);

        router.clients.forEach(function(socket){
            socket.emit('refresh chatrooms', rooms);
        })
    });
};
router.disconnectClient = (client) => {
    router.clients.splice(router.clients.indexOf(client), 1);
    console.log('Disconnected: %s sockets connected', router.clients.length);
};

module.exports = router;
