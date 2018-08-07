const http = require('http');
const fs = require('fs');
const stream = require('stream');
const url = require('url');
const mime = require('mime');
const Transfer = require('./src/checkFile');
function fileSend(path, req, res) {
    var config = {};
    var startPos = 0;
	if( typeof Range != 'undefined') {
        var startPosMatch = /^bytes=([0-9]+)-$/.exec(Range);
        startPos = Number(startPosMatch[1]);
        if(startPos == 0) {   //配置请求头
            res.setHeader('Accept-Range', 'bytes');
        } else {
            res.setHeader('Content-Range', 'bytes ' + startPos + '-' + (fileSize - 1) + '/' + fileSize);
        }
	}
    res.writeHead(200,{'Content-type': mime.getType(path)}); //配置文件类型
    fs.stat(path, function(error, state) {
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
                encoding : 'binary',
                bufferSize : 1024 * 1024,
                start : config.startPos,
                end : config.fileSize
            });
             read.pipe(res);
             read.on('end', function(){
                res.end();
             })
        }
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
        fileSend();
        break;
        default:
        fileSend('.' + urlObj.pathname, req, res);
        break;
    }
}).listen(8080);
console.log('已经开始监听8080端口');