# Cac su kien trong socket.io

## socket.io co su kien lang nghe io.on

cu phap

```js
    io.on("connection",function(socket){
        // lang nghe su kien connection tao ra 1 socket
        socket.on("disconnect",function(){
            // ham nay tao ra mot su kien lang nghe disconnect thoat ra khoi socket
        })
    })
```
ve co ban cac ham .on la cac ham lang nghe

## socket.io co su kien phat tin hieu

socket.emit(key="",mgs="")


ham gui tu server to client

io.sockets.emit('key',mgs)

socket.on("key",function(data){

})