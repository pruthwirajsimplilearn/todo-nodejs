const fs = require('fs');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

readline.question(`Choose a number\nFor add task enter 1\nFor display tasks enter 2\nFor delete any task enter 3\nenter your input `, num => {

  if (num == 1) {
    readline.question(`what is your task? `, task => {
      fs.appendFile('tasklist.txt', `\n${task}`, (err) => { });
      console.log(`${task} is added to your tasklist file`);
      readline.close();
    });
  }

  if (num == 2) {
    console.log("\npending tasks are\n===================");
    fs.readFile('tasklist.txt', 'utf8', function (err, data) {
      console.log(data);
    });
    readline.close();
  }

  if (num==3) {
    var list;
    fs.readFile('tasklist.txt', 'utf8', function(err, data)
    {
      list = data.split('\n');   
      console.log(list);   
    });    
    readline.question(`which task you want to delete?\n`, task => { 
      fs.truncate('tasklist.txt', 0,function(){});   
      for (let i = 0; i < list.length; i++) {
        if (task!=list[i] && list[i]!='') {
          fs.appendFile('tasklist.txt', `${list[i]}\n`, (err) => { });
        }
      }
      console.log(`${task} is deleted successfully`);
      fs.readFile('tasklist.txt', 'utf8', function(err, data)
      {
        list = data.split('\n');   
        console.log(list);   
      });
      readline.close();
    });    
  }
})
