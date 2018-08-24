//背景: JavaScript对字符串处理十分友好，无论是宽字节还是单字节字符串，都被认为是一个字符串。
//Node中需要处理网络协议、操作数据库、处理图片、文件上传等，还需要处理大量二进制数据，自带的字符串远不能满足这些要求，因此Buffer应运而生。
//应用场景：纯粹的javascript支持unicode码而对二进制不是很支持，当解决TCP流或者文件流的时候，处理流是有必要的，我们保存非utf-8字符串，2进制等等其他格式的时候，我们就必须得使用”Buffer“。

//@@@@@@@@扩展 //实际上类似es6的 blob对象  
var blob = new Blob([typedArray], {type: "application/octet-binary"});// 传入一个合适的MIME类型
var url = URL.createObjectURL(blob); //等同于 readAsDataURL
// 会产生一个类似blob:d3958f5c-0777-0845-9dcf-2cb28783acaf 这样的URL字符串
// 你可以像使用一个普通URL那样使用它，比如用在img.src上。
//扩展 new FileReader
readAsArrayBuffer(file)	//按字节读取文件内容，结果用ArrayBuffer对象表示  buffer对象
readAsBinaryString(file)	//按字节读取文件内容，结果为文件的二进制串 
readAsDataURL(file)	//读取文件内容，结果用data:url的字符串形式表示
readAsText(file,encoding)	//按字符读取文件内容，结果用字符串形式表示
abort()	//终止文件读取操作


var a = {}