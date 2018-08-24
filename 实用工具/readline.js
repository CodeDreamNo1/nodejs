const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.question('请输入你的名字可以检测姻缘:', (answer) => {
  var name = answer;
  rl.question(answer + ',你是猪吗？ yes/no', (answer) => {
    // 对答案进行处理
    if (answer.match(/^y(es)?$/i)) {
          console.log(`${answer}你这样的回答，注孤生`);
         rl.pause()
     } else {
          console.log('可以的小伙子,来接着聊人生别走了');
    } ;
  });
})

