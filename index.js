const express = require('express'); // khai báo express
const app = express();// khai báo express

app.use(express.static("public")) // khai báo đường dẫn mặc định
app.set("view engine","ejs")// khai báo view engine ejs
app.set("views","./views")
const server = require("http").Server(app); //tạo ra cổng http
const io = require("socket.io")(server);
server.listen(3000); // server lắng nghe

var mangUser = [];
var listRoom = [];

io.on("connection",function(socket){ // lang nghe nguoi su dung
        socket.on("Client-send-name",function(data){
                if(mangUser.indexOf(data) >= 0){
                        socket.emit("Server-dang-ky-that-bai")
                }
                else{
                        mangUser.push(data);
                        socket.name = data;
                        socket.emit("Server-dang-ky-thanh-cong",data);
                        io.sockets.emit("Server-send-danh-sach",mangUser);
                }
        });
        //socket.emit("server-send-id",socket.id)
        socket.on("logout",function(){
                mangUser.splice(
                        mangUser.indexOf(socket.name), 1
                );
                socket.broadcast.emit("leave",socket.name);
                socket.broadcast.emit("Server-send-danh-sach",mangUser);
        })
        socket.on("user-send-message",(data)=>{
                io.sockets.emit("Server-send-message",{"name" : socket.name , "message" : data});
        });
        socket.on("Create-room",(name)=>{
                socket.join(name);
                listRoom.push(name);
                socket.roomName = name;
                io.sockets.emit("Server-create-room-success",listRoom);
        })
        socket.on("disconnect",function () {
                socket.emit("Server-disconnect");
                mangUser.splice(
                        mangUser.indexOf(socket.name), 1
                );
                socket.broadcast.emit("leave",socket.name);
                socket.broadcast.emit("Server-send-danh-sach",mangUser);
        })

});
app.get("/",function (req, res){
        res.render("trangchu") // app. get port
});

