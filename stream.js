var stream=require("stream");
var fs=require("fs");
/*
保存在v8所能调用的内存里面
//分类
* 1.  可读流
*      a.  在内存里面要开辟一块空间用来存储数据（10m）
*      b.  流创建了就应该去消费，如何消费流？
*          1. 手动去消费流   resume()
*          2. data事件去消费流
 *         3. 通过指定目的地区消费流
*
* 2.  可写流
* 3.  双工流
* 4.  转换流
 *  
     1.  push()
     2.  消费流
     3.  数据写入 可写流  write()
     4.  输出到目的地   _write=function(a,b,c){}
         
*
* */
// 可读流模式

// ·内部有flowing(流动)模式和非flowing(暂停)模式来读取数据

// ·flowing模式使用操作系统的内部IO机制来读取数据，并尽可能快的提供数据

// ·非flowing模式时流默认处于暂停模式，必须显示调用read方法来读取数据

// 　　注意：如果没有绑定data事件处理器，并且没有pipe()目标，同时流被切换到流动模式，那么数据会丢失。比如没有绑定data事件，但是触发了resume方法。

// ·如何切换到流动模式

// 　　-添加一个data事件处理器来监听数据

// 　　-调用resume()方法来明确开启数据流  回复从缓存中读取数据

// 　　-调用pipe()方法将数据发送到一个Writable可写流

// ·切换回暂停模式

// 　　-如果没有导流目标，调用pause()方法。 暂停从缓存中读取数据

// 　　-如果有导流目标，移除所有data事件处理器，调用unpipe()方法移除所有导流目标

// 可读流的事件

// 　　readable:监听readable会使数据从底层读到系统缓存区，读到数据后或者排空后如果再读到数据，会触发readable事件

// 　　data:绑定一个data事件监听器会将流切换到流动模式，数据会被尽可能的读出

// 　　end:该事件会在读完数据后被触发

// 　　error:当数据接收发生错误时触发

// 　　close:当底层数据源（比如：源头的文件描述符）被关闭时触发，并不是所有流都会触发这个事件

// 可读流的方法

// 　　read:在readable事件触发时的回调函数里读取数据

// 　　setEncoding:指定编码

// 　　pause:通知对象停止触发data事件

// 　　resume:通知对象恢复触发data事件

// 　　pipe:设置管道，将可读流里的内容导入到参数指定的可写流中

// 　　unpipe:取消数据通道

// 　　unshift:把数据块插回队列开头

//可写流

const file = fs.createWriteStream('./big.txt');
for(let i=0; i<= 1e6; i++) { //创建一个大文件 约400M
  file.write('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n');
}

file.end();
//双工流
var transform1=new stream.Transform;
var transform2=new stream.Transform;
var transform3=new stream.Transform;
transform1._read=function(){
    this.push("a"); //push了之后作为可读流的部分
    this.push("b");
    this.push(null); //没有更多数据可读传入null
};
transform2._transform=function(a,b,c){       
    //a代表即将要输出的数据
    //b 数据的格式
    //c  进行下一次传输
      this.push(a.toString().toUpperCase());
      c(); //刷新缓存区
};
transform3._transform=function(a,b,c){
    console.log(a.toString());
    c();
};
transform1.pipe(transform2).pipe(transform3);

