const http = require('http');
const fs = require('fs');
const stream = require('stream');
const url = require('url');
const mime = require('mime');
const Transfer = require('./src/checkFile');
function fileSend(path, req, res, isload = false) {
    if (isload) { // 是否为下载
        var transfer = new Transfer(req, res);
        transfer.Download(path);
        return;
    }
        return fs.readFile(path, function(err, data) { //读取的文件为beffer存储在缓存区
        res.writeHead(200,{'Content-type': mime.getType(path)});    //响应客户端，将文件内容发回去//通过后缀名指定mime类型
            // if(Buffer.isBuffer(data)) { //判断是否为buffer类型
            //     if(Buffer.byteLength(data) < 1024 * 1024) {
            //         res.end(data);
            //     } else {
            //        fileSend(path, req, res, true);
            //     };
            // }        //data是buffer类型
            console.log('22222')
            console.log(path, data);
            res.end(data);
    })
    
}
http.createServer((req, res) => {
    if (req.url == "/favicon.ico") {
        return;
    }
    var urlObj = url.parse(req.url, true);
    switch (urlObj.pathname) {
        case '/':     ///根目录
        fileSend('./load.html', req, res);
        break;
        case '/load' :
        console.log('111')
        fileSend('./src/aa.mp3', req, res, true);
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