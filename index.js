const express = require('express'); // khai báo express
const app = express();// khai báo express

app.use(express.static("public")) // khai báo đường dẫn mặc định
app.set("view engine","ejs")// khai báo view engine ejs
app.set("views","./views")
const server = require("http").Server(app); //tạo ra cổng http
const io = require("socket.io")(server);
server.listen(3000); // server lắng nghe

var mangUser = [];

io.on("connection",function(socket){ // lang nghe nguoi su dung
        console.log("co nguoi ket noi " + socket.id);
        socket.on("Client-send-name",function(data){
                if(mangUser.indexOf(data) >= 0){
                        socket.emit("Server-dang-ky-that-bai")
                }
                else{
                        mangUser.push(data);
                        socket.name = data;
                        console.log(mangUser);
                        io.sockets.emit("Server-dang-ky-thanh-cong",data)
                }
        })

        socket.on("disconnect",function () {
                socket.emit("Server-disconnect")
        })

});
app.get("/",function (req, res){
        res.render("trangchu") // app. get port
});

