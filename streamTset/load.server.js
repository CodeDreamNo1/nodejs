const http = require('http');
const fs = require('fs');
const stream = require('stream');
const url = require('url');
const mime = require('mime');



   function fileSend(path, req, res) {
    var config = {};
    var startPos = 0;
    if (req.headers.range) { 
        console.log(req.headers)
        var Range = req.headers.range;
    }
	if( typeof Range != 'undefined') {
        var startPosMatch = /^bytes=([0-9]+)-$/.exec(Range);
        startPos = Number(startPosMatch[1]);
        if(startPos == 0) {   //配置请求头
            res.setHeader('Accept-Range', 'bytes');
        } else {
            res.setHeader('Content-Range', 'bytes ' + startPos + '-' + (config.fileSize - 1) + '/' + config.fileSize);
        }
	}
    res.writeHead(200,{'Content-type': mime.getType(path)}); //配置文件类型
    fs.stat(path, (error, state) => {
        if(error) throw error;
        if (state.isDirectory()) res.end();
        config.fileSize = state.size;
        config.startPos = startPos;
		if (state.size < 7 * 1024 * 1024) { //小于7m的小文件
            var read = fs.readFile(path, function(err, data) {
                res.end(data);
            });
        } else { //大文件请求
            var read = fs.createReadStream(path, {
                bufferSize : 1024 * 1024 * 1024,
                start : config.startPos,
                end : config.fileSize
            });
             read.pipe(res);
             read.on('end', function(){
                res.end();
             })
        }
        //read.on('data', function(data) {
            // data为从缓存区拿到的数据
        //})
    // if(Buffer.isBuffer(data)) { //判断是否为buffer类型
    //     if(Buffer.byteLength(data) < 1024 * 1024) {
    //         res.end(data);
    //     } else {
    //        fileSend(path, req, res, true);
    //     };
    // }        //data是buffer类型     
    })
}
http.createServer((req, res) => {
    if (req.url == "/favicon.ico" || req.url == '/src/jquery.min.map') {
        return;
    }
    var urlObj = url.parse(req.url);
    switch (urlObj.pathname) {
        case '/':     ///根目录
        fileSend('./load.html', req, res);
        break;
        case '/src/ss.mp4' :
        fileSend('./src/ss.mp4', req, res);
        break;
        case '/stop' :
        fileSend('./src/ss.mp4', req, res);
        break;
        case '/downloadtxt' :
        fileSend('./src/big.txt', req, res);
        break;
        default:
        fileSend('.' + urlObj.pathname, req, res);
        break;
    }
}).listen(8080);
console.log('已经开始监听8080端口');