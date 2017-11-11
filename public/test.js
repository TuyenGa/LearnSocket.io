
    let registered = false,
        name = "",
        room = "android",
        toId = '';

    // Set up
    var socket = io();

    // Announce new friend join your room.
    socket.on('joined', (data) => {

        $('#chatbox').append(`\n ${data.name} joined the room!`);

        $('#list-friends').html("");
        data.mems.forEach(mem => {
            $('#list-friends').append(`<li id=${mem.id} class="list-group-item" onclick='connectID(this)'>${mem.name}</li>`);
        });
    })

    //Announce a friend leave you room
    socket.on('leaved', (data) => {
        $('#chatbox').append(`\n  ${data.name} leaved the room!`);
        $('#list-friends').html("");

        data.mems.forEach(mem => {
            $('#list-friends').append(`<li id=${mem.id} class="list-group-item" onclick='connectID(this)'>${mem.name}</li>`);
        });
    })

    //Receive and show new message
    socket.on('news', (data) => {
        $("#chatbox").append("\n" + data.name + ": " + data.msg);
    });

    //new friend
    socket.on('toYou', data => {
        $("#chatbox").append("\n" + data.name + ": " + data.msg);
        toId = data.id;
    });

    // Function send a message to server.
    function sendChat() {
        let message = $('#chat').val();

        if (toId == '') {
            socket.emit("chat", { msg: message, name: name, room: room });
        } else {
            socket.emit('chatToId', { msg: message, name: name, id: toId, info: socket.id });
        }


        $('#chatbox').append('\nme: '.concat(message));
        $("#chat").val("");
    }
    //Function for registering and logging out
    function register() {
        //Log In
        if (!registered && $("#name").val()) {

            //Enable typing and sending
            $("#chat-content *").attr("disabled", false);
            $("#wellcome").append(`<p>Wellcome: <strong>${$("#name").val()}</strong></p>`)
            //Get user name
            name = $("#name").val();

            $("#name").attr("disabled", true);
            $("#register").html("Log out");

            //registered
            registered = true;

            //Joine default room (room 1)
            joinLeave('joined', name, room);
            $('#android').addClass('active');

        }
        // Log out
        else {

            //disable typing and sending
            $("#chat-content *").attr("disabled", true);
            $("#name").attr("disabled", false);

            // username = ''
            $("#name").val("");
            $("#register").html("Join");
            registered = false;
            $('#chatbox').val('');
            $("#wellcome").html();
            //Send request to leave current room
            joinLeave('leaved', name, room);

            reset();
        }
    }


    // Function leave and join a room
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
