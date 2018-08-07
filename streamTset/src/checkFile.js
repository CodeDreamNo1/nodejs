const fs = require('fs')
const mime = require('mime');
function Transfer(req, res) {
	this.req = req;
	this.res = res;
}
/**
 * 计算上次的断点信息
 * Range 请求http头文件中的断点信息，如果没有则为undefined，格式（range: bytes=232323-）
 * startPos 开始的下载点
 */
Transfer.prototype._calStartPosition = function(Range) { //获取
	var startPos = 0;
	if( typeof Range != 'undefined') {
        var startPosMatch = /^bytes=([0-9]+)-$/.exec(Range);
		startPos = Number(startPosMatch[1]);
	}
	return startPos;
}
/**
 * 配置头文件
 * Config 头文件配置信息（包含了下载的起始位置和文件的大小）
 */
Transfer.prototype._configHeader = function(Config) {
	var startPos = Config.startPos, 
		fileSize = Config.fileSize,
		res = this.res;
	// 如果startPos为0，表示文件从0开始下载的，否则则表示是断点下载的。
	if(startPos == 0) {
		res.setHeader('Accept-Range', 'bytes');
	} else {
		res.setHeader('Content-Range', 'bytes ' + startPos + '-' + (fileSize - 1) + '/' + fileSize);
	}
	res.writeHead(206, 'Partial Content', {
		'Content-Type' :  mime.getType(Config.filePath),
	});
}
/**
 * 初始化配置信息
 * filePath
 *  down 下载开始的回调函数
 */
Transfer.prototype._init = function(filePath, down) {
	var config = {};
	var self = this;
	fs.stat(filePath, function(error, state) {
		if(error)
			throw error;
        if (state.isDirectory()) return;
		config.fileSize = state.size;
		config.filePath = filePath;
		var range = self.req.headers.range;
		config.startPos = self._calStartPosition(range);
		self.config = config;
		self._configHeader(config);
		down();
	});
}
/**
 *生成大文件文档流，并发送
 * filePath 文件地址
 */
Transfer.prototype.Download = function(filePath) {
	var self = this;
	fs.exists(filePath, function(exist) {
		if(exist) {
			self._init(filePath, function() {
				var config = self.config
					res = self.res;
				fReadStream = fs.createReadStream(filePath, {
					encoding : 'binary',
					bufferSize : 1024 * 1024,
					start : config.startPos,
					end : config.fileSize
				});
				fReadStream.on('data', function(chunk) {
					res.write(chunk, 'binary');
				});
				// fReadStream.pipe(res);
				fReadStream.on('end', function() {
					res.end();
				});
			});
		} else {
			console.log('文件不存在！');
			return;
		}
	});
}
module.exports = Transfer;