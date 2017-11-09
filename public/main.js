
let socket = io("http://localhost:3000"); // ket noi vao server

$(document).ready(function () {
    $("#join").click(function () {
        socket.emit("Client-send-name", $("#name").val());
        $("#name").val("")
    });

    $("#logout").click(function(){
        socket.emit("logout");
        $("#status-name").hide(1000);
        $("#inputname").show(2000);
        $("#title").html(" ");
    })

    socket.on("Server-dang-ky-thanh-cong",function (data) {
        $("#inputname").hide(2000);
        $("#title").append(`<p class='col-md-12'>Welcome: <strong> ${data} </strong></p>`)
    }); // dang ky thanh cong
    chatrieng = (item) =>
    {
        alert($(item).attr('id'))
    }
    socket.on("leave",(data) => {
        $("#chat-box").append(`\t ${data} leave out conversation.\n`);
    })
    $("#input-room").hide();
    $("#tao-nhom").click(() => {
        $("#tao-nhom").hide();
        $("#input-room").show(2000);

    });
    $("#create").click(() =>{
        let roomName = $("#room").val();
        socket.emit("Create-room",roomName);
        $("#room").val("");
    })
    socket.on("Server-send-danh-sach",function(data){
        $("#status-name").html("");
        data.map((i) =>{
            $("#status-name").append(`<li class='user' >${i} online </li>`);
        });
    });
    $("#send").click(() => {
        socket.emit("user-send-message",$("#message").val());
        $("#message").val("")
    })
    socket.on("Server-send-message",(data) => {
        $("#chat-box").append("\n"+ data.name + ": "+data.message);
    })
    socket.on("Server-dang-ky-that-bai", () => { // dang ky that bai
        alert("Username da co nguoi su dung");
    });
    socket.on("Server-create-room-success",(data) =>{
        data.map((item)=>{
            $("#list-room").append(
                `<tr>
                    <td>${item}</td>
                </tr>`
            )
        })
    })


});