const server = require("https");
const fs = require('fs');
const options = {
   hostname:'local.gys.com',
   port:8888,
   path:'/',
   method:'GET'
};
server.createServer(options ,(req,res) => {
	res.writeHead(200);
	res.end('hello word');
}).listen(8888);