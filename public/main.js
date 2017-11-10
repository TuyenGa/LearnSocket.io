
let socket = io(); // ket noi vao server

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
    socket.on("leave",(data) => {
        $("#chat-box").append(`\n \t  ${data} left\n`);
    })
    $("#input-room").hide();
    $("#tao-nhom").click(() => {
        $("#tao-nhom").hide();
        $("#input-room").show(2000);

    });
    socket.on("Server-send-danh-sach",function(data){
        $("#status-name").html("");
        data.map((i) =>{
            $("#status-name").append(`<li class='list-group-item' >${i} online </li>`);
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
});
function joinLeave(type, name, room) {
    socket.emit(type, { name: name, room: room, id: socket.id });
    toId = '';
}

//Function click and change room
function changeRoom(item) {
    let val = $(item).text();
    if (val !== room) {
        joinLeave("leaved", name, room);
        room = val;
        joinLeave('joined', name, room);
    } else {
        alert("You already joined this room!");
    }

    $('ul li').removeClass('active');
    toId = '';
    $(item).addClass('active');
}

//Click to chat to a people
function connectID(item) {
    toId = $(item).attr('id');
}

// function reset
function reset() {
    registered = false;
    name = "";
    room = "android";
    toId = '';
    $("ul li").removeClass('active');
}