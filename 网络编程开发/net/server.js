var net = require('net');
//第一步 创建TCP服务器
var server = net.createServer();
// 存储所有客户端socket
//第四步，服务器接收所有的用户连接
var sockets = [];
//第二步 接收客户端请求
server.on('connection', function(socket) {
    console.log('Got a new connection');
　　//第五步，服务器广播数据
    sockets.push(socket);
　　//第三步，获取客户端发送过来的数据
    socket.on('data', function(data) {
        console.log('Got data: ', data);

        sockets.forEach(function(otherSocket) {
            if (otherSoecket !== socket) {
                otherSocket.write(data);
            }
        });
    ])
    // 第六步，关闭连接客户端从服务器广播列表删除
    socket.on('close', function() {
        console.log('A client connection closed');
        var index = sockets.indexOf(socket);
        sockets.splice(index, 1);
    });
});

server.on('error', function(err) {
    console.log('Server error: ', err.message);
});

server.on('close', function() {
    console.log('Server closed');
});

server.listen(8080);