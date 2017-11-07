const express = require('express'); // khai báo express
const app = express();// khai báo express

app.use(express.static("public")) // khai báo đường dẫn mặc định
app.set("view engine","ejs")// khai báo view engine ejs
app.set("views","./views")
const server = require("http").Server(app); //tạo ra cổng http
const io = require("socket.io")(server);
server.listen(3000); // server lắng nghe

io.on("connection",function(socket){ // lang nghe nguoi su dung
        console.log("co nguoi ket noi " + socket.id);
        socket.on("Client-send-data",function(data){
                io.sockets.emit("Server-send-data",data +" Hellsc");
        })


        socket.on("disconnect",function () {
                console.log(socket.id + " co nguoi ngat ket noi! ")
        })

});
app.get("/",function (req, res){
        res.render("trangchu") // app. get port
});

