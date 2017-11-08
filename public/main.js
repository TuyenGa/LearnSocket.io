
let socket = io(); // ket noi vao server

$(document).ready(function () {
    $("#join").click(function () {
        socket.emit("Client-send-name", $("#name").val());
    });

    socket.on("Server-dang-ky-thanh-cong",function (data) {
        alert(data + " da dang ky thanh cong");
    }); // dang ky thanh cong

    socket.on("Server-dang-ky-that-bai",function () { // dang ky that bai
        alert("Username da co nguoi su dung");
    });


});