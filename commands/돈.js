const fs = require('fs');


module.exports = {
    name: "돈",
    description: "돈주는 코드",

    async run (client, message, args) {


      const id = message.author.id;
      const name = message.author.username;



    const filePath = `./data/${id}.json`;

 !fs.existsSync(filePath) ? fs.writeFileSync(filePath, JSON.stringify({})) : null; // 파일이 없다면 생성

const user = JSON.parse(fs.readFileSync(filePath, "utf-8"));
const today = new Date();
const date = "" + today.getFullYear() + today.getMonth() + today.getDate();
const howMuch = 3000;


  let saveUser = {};
  if(user.id) {
    if(user.date === date) {
      message.reply(`오늘은 이미 돈을 받으셨습니다! 내일 다시 받아주세요!`);
      saveUser = user;
    }
    else {
      message.reply(`${howMuch}원을 지급 하였어요!\n${name}남의 현재 잔액은  ${user.money} -> ${user.money + howMuch}입니다`);
      saveUser = {
        id,
        name,
        date,
        money : user.money + howMuch,
      }
    }
  }
  else {
    message.reply(`${name} 환영합니다! 돈이 ${howMuch}원이 지급됐어요!`);
    saveUser = {id, name, date, money : howMuch};
  }

  fs.writeFileSync(filePath, JSON.stringify(saveUser));

  if(args[0] == "잔액"){
  user.id ? message.reply(`${name}의 현재 잔액은 ${user.money}원 입니다.`) : message.reply(`등록 되지 않은 유저`);
}
}};