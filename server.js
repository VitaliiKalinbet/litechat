const cors = require('cors');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require("socket.io")(server, {
   path: '/chat/',
   origins: "*:*"
});
const PORT = process.env.PORT || 3003;
const mongoose = require('mongoose');
const Message = require('./Schema');

mongoose.Promise = global.Promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://admin:myfirstdbadmin1@ds137530.mlab.com:37530/myfirstdb');

app.use(cors());
app.options('*', cors());

app.get('/', (req, res) => {
    Message.find({}, (err,users) => {
        if (err) throw err;
        res.json(users)
    })
})

let online = 0;
io.on('connection', (client) => {
    console.log("User connected");
    // let allMessages = Message.find();
    // client.broadcast.emit("all-massages", allMessages);
    console.log(++online);
    client.broadcast.emit("change-online", online);
    client.on("disconnect", () => {
        console.log(--online);
        client.broadcast.emit("change-online", online);
    });

    client.on("message", (message) => {
        console.log(message);
        client.broadcast.emit("new-message", message);
        const newMessage = Message(message);
        console.log(newMessage);
        newMessage.save();
        // let M = Message.find();
        // console.log(M);
    });

    client.on("typing", (is) => {
        client.broadcast.emit("somebody-typing", is);
    })
});

app.use(express.static('../build'));
server.listen(PORT, () => (console.log(`server is running on ${PORT}`)));