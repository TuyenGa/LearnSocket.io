const express = require('express'); // khai báo express
const app = express();// khai báo express

app.use(express.static("public")) // khai báo đường dẫn mặc định
app.set("view engine","ejs")// khai báo view engine ejs
app.set("views","./views")
const server = require("http").Server(app); //tạo ra cổng http
const io = require("socket.io")(server);
server.listen(3000); // server lắng nghe

io.on('connection', function (socket) {

        //user request to join room
        socket.on('joined', (data) => {
                socket.join(data.room);

                mems[data.room].push({
                        id: data.id,
                        name: data.name
                });

                io.sockets.in(data.room).emit("joined", { name: data.name, id: data.id, mems: mems[data.room] });
        });

        //user request to leave room
        socket.on('leaved', (data) => {
                socket.leave(data.room);

                let newData = mems[data.room].filter(item => {
                        return item.id !== data.id;
                });

                mems[data.room] = newData;

                io.sockets.in(data.room).emit("leaved", { name: data.name, id: data.id, mems: mems[data.room] });
        });

        // new Message sent
        socket.on('chat', (data) => {

                // Broadcast message to all user in room
                socket.broadcast.to(data.room).emit('news', { msg: data.msg, name: data.name })

        });

        socket.on('chatToId', (data) => {
                socket.broadcast.to(data.id).emit('toYou', { msg: data.msg, name: data.name, id: data.info })
        });
});

const mems = {
        android: [],
        ios: [],
        webdev: []
};
app.get("/",function (req, res){
        res.render("trangchu") // app. get port
});

