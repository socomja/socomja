require("dotenv").config();
const fs = require("fs");

const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token,} = require("./config.json");

const { readdirSync } = require('fs');
const { join } = require('path');
const { executionAsyncResource } = require('async_hooks');
const ytdl = require('ytdl-core');
const bot = new Discord.Client();
const pagination = require('discord.js-pagination');
const { Collection, Client } = require("discord.js");
const Levels = require('discord-xp');
const discordButtons = require("discord-buttons-plugin");
const buttonClient = new discordButtons(client)
const disbut = require('discord-buttons')(client);
const klunch = require('k-lunch')

client.commands = new Discord.Collection(); 
client.queue = new Map();

var ytAudioQueue = [];
var dispatcher = null;

client.config = {
    
    SOUNDCLOUD: process.env.SOUNDCLOUD_CLIENT_ID
  }

  

const sleep = (ms) => {return new Promise(resolve=>{setTimeout(resolve,ms)})}
client.on('ready', async() => {
    while(1) {
      client.user.setActivity("제작자:자서#8302")
      await sleep(4000)
      client.user.setActivity("디코섭:EHbhnz5B4P")
      await sleep(4000)
      client.user.setActivity("%도움말")
      await sleep(4000)
      client.user.setActivity("문의는 봇에게 디엠 해주세용~")
      await sleep(4000)
      client.user.setActivity("[AD]뮤직봇도 많이 이용해주세요~")
      await sleep(4000)
    } 
  })

 

client.commands = new Discord.Collection(); 
const queue = new Map();
 
const commandFile = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith("js"));


for (const file of commandFile) {
    const command = require(join(__dirname, "commands", `${file}`));
    client.commands.set(command.name, command);
    let commandName = file.split(".")[0];
    
    console.log("로딩완료: "+commandName)
}

client.on("error", console.error);


 


fs.readdir(__dirname + "/events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach((file) => {
      const event = require(__dirname + `/events/${file}`);
      let eventName = file.split(".")[0];
      client.on(eventName, event.bind(null, client));
      console.log("Loading Event: "+eventName)
    });
  });

 
  client.on('ready', () => {
    console.log('ready');

  client.api.applications(client.user.id).commands.post({
    data: {
        name: "테스트",
        description: "테스트용!"
    }
});

client.api.applications(client.user.id).commands.post({
    data: {
        name: "echo",
        description: "Echos your text as an embed!",

        options: [
            {
                name: "content",
                description: "Content of the embed",
                type: 3,
                required: true
            }
        ]
    }
});

client.ws.on('INTERACTION_CREATE', async interaction => {
    const command = interaction.data.name.toLowerCase();
    const args = interaction.data.options;

    if(command == '테스트') {
        client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    content: "테스트!"
                }
            }
        });
    }

    if(command == "echo") {
        const description = args.find(arg => arg.name.toLowerCase() == "content").value;
        const embed = new discord.MessageEmbed()
            .setTitle("Echo!")
            .setDescription(description)
            .setAuthor(interaction.member.user.username);

        client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: await createAPIMessage(interaction, embed)
            }
        });
    }
});


async function createAPIMessage(interaction, content) {
const apiMessage = await discord.APIMessage.create(client.channels.resolve(interaction.channel_id), content)
    .resolveData()
    .resolveFiles();

return { ...apiMessage.data, files: apiMessage.files };
}
  });

  client.on('message', (message) => { 
    if(message.content === `${prefix}핑`) {
    const timeTaken = Date.now() - message.createdTimestamp; 
    message.channel.send(`봇의 핑은 ${Math.round(client.ws.ping)}ms`) 
    message.channel.send(`서버의 핑은 ${timeTaken+1337}ms입니다`)
    }
})


client.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;
    if(message.author.bot) return 

    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);

        const command = args.shift().toLowerCase();

        if(!client.commands.has(command)) return;

        try {
            client.commands.get(command).run(client, message, args);
        } catch (error) {
            console.error(error);
        }
    }
})


client.on('message', async message => {
    const args = message.content.substring(prefix.length).split(' ')


    if(message.content.startsWith(`${prefix}투표`)) {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('당신은 권한이 없습니다.')

        const vote = args.slice(1).join(' ')

        const regex = vote.match(/"[^"]+"|[\\S]+"[^"]+/g)

        if(regex.length > 10) {
            return message.channel.send('최대 9개까지만 투표 할 수 있습니다')
        }

        let str = ''

        let emoji = [
            '1️⃣',
            '2️⃣',
            '3️⃣',
            '4️⃣',
            '5️⃣',
            '6️⃣',
            '7️⃣',
            '8️⃣',
            '9️⃣'
        ]

        let i = 0

        for (const poll of regex) {
            str = str + `${emoji[i]} ${poll}\n\n`
            i++
        }

        const a = new Discord.MessageEmbed()
        .setDescription(str.replace(/"/g, ''))

        const msg = await message.channel.send(a)

        for (let i = 0; i < regex.length; i++) {
            msg.react(emoji[i])
        }

        message.delete();
    }
})

client.on('message', async(message) => {
    if(message.content === prefix+'펑') {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('당신은 권한이 없습니다.')
        const embed = new Discord.MessageEmbed()
      .setDescription("펑!")
      .setImage("https://media.giphy.com/media/HhTXt43pk1I1W/giphy.gif")
      .setColor("RANDOM")
      message.channel.delete();
      message.channel.clone().then(channel => {
        channel.send(embed)
      })
    }
});

client.on('message', message=>{
    if(message.content === `${prefix}시간`){
        var today = new Date();   

        var hours = today.getHours(); // 시
        if( hours < 10 ) {
            hours = "0" + hours;
        }
        var minutes = today.getMinutes();  // 분
        if( minutes < 10 ) {
            minutes = "0" + minutes;
        }
        var seconds = today.getSeconds();   //초
        if( seconds < 10 ) {
            seconds = "0" + seconds;
        }
        
        var nowTime = "" + hours + "시 " + minutes + "분 " + seconds + "초";
        message.channel.send(`현재 시간: ${nowTime}`)
    }
})



  

 

client.on('message', async (message) => {

    const channel = client.channels.cache.find(x => x.id == '843699446943973376')
  
    if (message.author.bot) {
  
      return
  
    } else if(message.channel.type == 'dm') {
  
      channel.send(`${message.author.tag} 님이 봇에게 DM 발송함`)
      channel.send(`보낸 내용: ${message.content}`)
      
    }
  })


//자서섭
client.on('guildMemberAdd', member => {   //guildMemberRemove
    const channel_111 = member.guild.systemChannel
    if (!channel_111) return;
    const pong_ping = new Discord.MessageEmbed()
    .setColor('0x0ffff0').setTitle("멤버 입장").setDescription(`새로운 멤버 \n${member}님이 **${member.guild.name}**에 들어오셨어요. \n${member}님, **${member.guild.name}**에 오신것을 환영합니다!`)
    channel_111.send(pong_ping)
  });
  //시스템 체널에 올라옴
  
  client.on('guildMemberRemove', member => {   //guildMemberRemove
    const channel_2222 = member.guild.systemChannel
    if (!channel_2222) return;
    const pong_ping1 = new Discord.MessageEmbed()
    .setColor('0x0fffff').setTitle("멤버 퇴장").setDescription(`퇴장한 멤버 \n${member}님이 **${member.guild.name}**에서 나가셨어요. \n${member}님, 안녕히가세요 ㅠㅠ`)
    channel_2222.send(pong_ping1)
  });


client.on('message', (message) => {
    if(message.content === '%아야') {
        message.channel.send(
            embed = new Discord.MessageEmbed()
            .setTitle('뱅드림 Pastel Pallets의 보컬')
            .addField("풀네임","마루야마 아야")
            .setImage('https://cdn.discordapp.com/attachments/825982538040082442/843654710870409216/Screenshot_20210504-190351.jpg')
            .setColor('#1de9b6')
        )}
});


client.on('message', (message) =>{
    if(message.content === 'ㅗ'){
        message.channel.send('ㅗㅗ')
    }
});

client.on('message', (message) =>{
    if(message.content === '마플마플'){
        message.reply('https://www.youtube.com/channel/UC1q4Ihlv_YhLELw-ijE0Diw')
    }
});

client.on('message', (message) =>{
    if(message.content === '리라코인'){
        message.channel.send(
            embed = new Discord.MessageEmbed()
       .setTitle('리라코인은 훌륭한 친구죠 ^^(리라코인이 이렇게 안하면 죽인다했어요...)')
       . setColor('#ff3d00')
    )}
});

client.on('message', (message) =>{
    if(message.content === '엿먹어'){
        message.channel.send('맛있다 ㅎㅎ')
    }
});

client.on('message', (message) =>{
    if(message.content === '리라리라'){
        message.channel.send(
            embed = new Discord.MessageEmbed()
       .addField('리라코인 망해라~!','아 이미 망했구나?')
       .setColor('RANDOM')
        )}
});

client.on('message', (message) => {
    if(message.content === '자서봇') {
        message.channel.send('자서가 처음만든봇(바로 저 입니당~)')
    }
});

client.on('message', (message) => {
    if(message.content === '배고파') {
        message.channel.send('저도용....')
    }
});

client.on('message', (message) => {
    if(message.content === '돈내놔') {
        message.channel.send('저 돈없어요 ㅠㅠ')
    }
});





client.on('message', (message) => {
    if(message.content === '루카루카') {
        message.reply(embed = new Discord.MessageEmbed()
        .setDescription('[루카★루카 나이트피버~](https://youtu.be/A0ny-2atcaY)')
        .setImage("https://cdn.discordapp.com/attachments/826790237766156299/833320924899573770/Screenshot_20210418-213845.jpg")
        .setColor('#f50057')
        )}
});

client.on('message', (message) => {
    if(message.content === '여행') {
        message.reply(embed = new Discord.MessageEmbed()
        .setDescription('[BOL4[여행]](https://www.youtube.com/watch?v=xRbPAVnqtcs)')
        .setImage("https://cdn.discordapp.com/attachments/826790237766156299/833648545919533076/unknown.png")
        .setColor('#00bcd4')
        )}
});

client.on('message', (message) => {
    if(message.content === '무한~') {
        message.reply(embed = new Discord.MessageEmbed()
        .setTitle("무야~호!")
        .setColor('#ff3d00')
        )}
});


client.on('message', (message) => {
    if(message.content === `${prefix}박지율`) {
          message.reply(
             embed = new Discord.MessageEmbed()
                .setTitle("")
                     .setImage("https://cdn.discordapp.com/attachments/800912786527092767/828630677070413894/Screenshot_20210331-221718_KakaoTalk.jpg")
                        .setColor('RANDOM')
                        ) 
        message.reply(
            embed = new Discord.MessageEmbed()
            .setTitle("")
            .setDescription('아 그 <@!477448050982518784>님이 매일 스토킹하는 애요?')
            .setColor('RANDOM')
            )

        message.reply(
            embed = new Discord.MessageEmbed()
            .setTitle("")
            .setDescription('<@!477448050982518784>님 그사람 스토킹하니까 재밌나요?')
            .setColor('RANDOM')
            )
                message.reply(
                    embed = new Discord.MessageEmbed()
                    .setTitle("")
                    .setDescription(`'너무 좋아서 입에 달고 산다고 들었는는데...'`)
                    .setColor('RANDOM')
                    ) 
                   
                   
             message.reply(
                embed = new Discord.MessageEmbed()
                .setTitle("")
                .setDescription('<@!477448050982518784>님 ```박지율```좀 그만 좋아하세요 ㅋㅋㅋ')
                .setColor('RANDOM')
                )
}});


var roulette = false;
client.on('message', message => {
    if (message.content.startsWith(`${prefix}룰렛`)) { // 명령어는 (접두사)룰렛 <배팅할 코인> 입니다.
        if (roulette === true) return message.reply(`이미 룰렛 게임이 진행중이야!`); // 게임이 진행중이라면 실행취소
        const args = message.content.slice(prefix.length + 3).trim().split(/ +/);
        if (!args[0]) return message.reply(`배팅할 코인을 입력해줘!`) // 배팅할 코인이 입력되지 않았다면 실행취소
        if (isNaN(args[0])) return message.reply(`배팅할 코인을 바르게 입력해줘!`);
        const bettingCoins = args[0];
        const id = message.author.id;
        const name = message.author.username;
        const filePath = `./data/${id}.json`;
        if (!fs.existsSync(filePath)) return message.reply(`등록되지 않은 유저야! ${prefix}돈 을 입력해봐!`); // data 폴더에 유저정보가 없다면 실행취소
        const user = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        if (bettingCoins > user.money) return message.reply(`가지고 있는 것보다 많은 코인은 배팅할 수 없어!`); // 배팅한 코인이 가지고있는것보다 많다면 실행취소
        if (bettingCoins > 1000) return message.reply(`한 번에 최대 1000코인만 배팅할 수 있어!`); // 최대 300코인 배팅 가능
        
        const percentage = Math.floor(Math.random() * 100); // 확률을 정하기 위한 변수
        var final_round; // 마지막 라운드가 어디인지 미리 정해야함
        var nowRound = 1; // 현재 라운드 변수
        var nowReward = bettingCoins; // 현재 보상 변수
        var saveUser = {}; // data 폴더에 유저정보를 저정하기 위한 변수
        var continued = false; // 계속을 하였는지 안하였는지
        if (percentage < 10) final_round = 5; // 26% 의 확률로 유저는 마지막 라운드까지 도달합니다.
        else if (percentage < 30) final_round = 4; // 31% 의 확률로 유저는 4라운드까지 도달합니다.
        else if (percentage < 42) final_round = 3; // 43% 의 확률로 유저는 3라운드까지 도달합니다.
        else if (percentage < 59) final_round = 2; // 60% 의 확률로 유저는 2라운드까지 도달합니다.
        else if (percentage < 95) final_round = 1; // 96% 의 확률로 유저는 2라운드까지 도달합니다.
        else if (percentage < 98) final_round = 0; // 99% 의 확률로 유저는 처음부터 죽습니다. (확률은 원하는대로 변경하세요.)
        
        message.channel.send(`🔫 ${name}이(가) ${bettingCoins}코인을 걸고 방아쇠를 당겼어...`);
        roulette = true; // 게임 시작
        if (final_round > 0) { // 시작하자마자 죽지 않았다면
            setTimeout(() => {
                message.channel.send(`😱 ${name}, 너는 살아남았고, ${Math.floor(bettingCoins * 1.3)}코인을 받았어!`);
                nowReward = Math.floor(bettingCoins * 1.3); // 현재 보상은 배팅한 코인의 1.1배
                saveUser = {id: user.id, name: user.name, date: user.date, money: user.money + Math.floor(bettingCoins * 1.3), xp: user.xp}; // saveUser 변수에 잔액을 변경
                fs.writeFileSync(filePath, JSON.stringify(saveUser)); // data 폴더에 유저정보를 저장
                setTimeout(() => {
                    message.channel.send(`${name}, **계속** 을 입력하여 모든 보상을 걸고 다시 도전하여 ${Math.floor(bettingCoins * 1.5)}코인을 받을 수 있어!`);
                    nowRound = nowRound + 1; // 다음 라운드로 넘어감
                }, 2000);
            }, 3000);
        }
        else { // 시작하자마자 죽었다면
            setTimeout(() => {
                message.channel.send(`☠ ${name}, 너는 패배하여 ${nowReward}코인을 잃었어!`);
                roulette = false; // 게임 중단
                saveUser = {id: user.id, name: user.name, date: user.date, money: user.money - nowReward, xp: user.xp}; // saveUser 변수에 잔액을 변경
                fs.writeFileSync(filePath, JSON.stringify(saveUser)); // data 폴더에 유저정보를 저장
            }, 3000);
        }

        client.on('message', message => {
            if (message.content === "계속") { // 계속을 입력했는데,
                if (roulette === true) { // 게임이 진행중이고,
                    if (continued == true) return; // 계속을 입력한 상태가 아니라면,
                    continued = true; // 계속을 입력한 상태로 바꾸고,
                    const id = message.author.id; 
                    const filePath = `./data/${id}.json`;
                    const user = JSON.parse(fs.readFileSync(filePath, "utf-8")); // 유저정보 변수를 다시 불러온다.
                    if (nowRound > 1) message.channel.send(`🔫 ${message.author.username}이(가) ${nowReward}코인을 걸고 다시 방아쇠를 당겼어...`);
                    setTimeout(() => {
                        if (nowRound == 2) { // 현재 라운드가 2라운드이고,
                            if (final_round > 1) { // 2라운드에서도 살았다면,
                                message.channel.send(`😱 ${message.author.username}, 너는 살아남았고, ${Math.floor(bettingCoins * 1.5)}코인을 받았어!`);
                                nowReward = Math.floor(bettingCoins * 1.5); // 배팅한 코인의 1.3배를 주고,
                                saveUser = {id: user.id, name: user.name, date: user.date, money: user.money + bettingCoins * 1.5 - bettingCoins * 1.5, xp: user.xp}; // saveUser 변수에 잔액을 변경
                                fs.writeFileSync(filePath, JSON.stringify(saveUser)); // data 폴더에 유저정보를 저장
                                setTimeout(() => {
                                    message.channel.send(`${name}, **계속** 을 입력하여 ${nowReward}코인을 걸고 다시 도전하여 ${Math.floor(bettingCoins * 2.0)}코인을 받을 수 있어!`);
                                    continued = false;
                                    nowRound = nowRound + 1;
                                }, 2000);
                            }
                            else { // 만약 2라운드에서 죽었다면,
                                message.channel.send(`☠ ${message.author.username}, 너는 패배하여 ${nowReward}코인을 잃었어!`);
                                roulette = false; // 게임 중단
                                continued = false; // 계속 여부 X
                                nowRound = 1; // 라운드를 초기화
                                saveUser = {id: user.id, name: user.name, date: user.date, money: user.money - nowReward - bettingCoins, xp: user.xp}; // saveUser 에 잔액 변경
                                fs.writeFileSync(filePath, JSON.stringify(saveUser)); // data 폴더에 유저정보를 저장
                            }
                        }
                        else if (nowRound == 3) { // 이 밑으로는 다 똑같아서 설명을 적지 않겠습니다.
                            if (final_round > 2) {
                                message.channel.send(`😱 ${message.author.username}, 너는 살아남았고, ${Math.floor(bettingCoins * 2.0)}코인을 받았어!`);
                                nowReward = Math.floor(bettingCoins * 2.0);
                                saveUser = {id: user.id, name: user.name, date: user.date, money: user.money + bettingCoins * 2.0 - bettingCoins * 2.0, xp: user.xp};
                                fs.writeFileSync(filePath, JSON.stringify(saveUser));
                                setTimeout(() => {
                                    message.channel.send(`${name}, **계속** 을 입력하여 ${nowReward}코인을 걸고 다시 도전하여 ${Math.floor(bettingCoins * 2.5)}코인을 받을 수 있어!`);
                                    continued = false;
                                    nowRound = nowRound + 1;
                                }, 2000);
                            }
                            else {
                                message.channel.send(`☠ ${message.author.username}, 너는 패배하여 ${nowReward}코인을 잃었어!`);
                                roulette = false;
                                continued = false;
                                nowRound = 1;
                                saveUser = {id: user.id, name: user.name, date: user.date, money: user.money - nowReward - bettingCoins, xp: user.xp};
                                fs.writeFileSync(filePath, JSON.stringify(saveUser));
                            }
                        }
                        else if (nowRound == 4) {
                            if (final_round > 3) {
                                message.channel.send(`😱 ${message.author.username}, 너는 살아남았고, ${Math.floor(bettingCoins * 2.5)}코인을 받았어!`);
                                nowReward = Math.floor(bettingCoins * 2.5);
                                saveUser = {id: user.id, name: user.name, date: user.date, money: user.money + bettingCoins * 2.5 - bettingCoins * 2.5, xp: user.xp};
                                fs.writeFileSync(filePath, JSON.stringify(saveUser));
                                setTimeout(() => {
                                    message.channel.send(`${name}, **계속** 을 입력하여 ${nowReward}코인을 걸고 다시 도전하여 ${Math.floor(bettingCoins * 3.2)}코인을 받을 수 있어!`);
                                    continued = false;
                                    nowRound = nowRound + 1;
                                }, 2000);
                            }
                            else {
                                message.channel.send(`☠ ${message.author.username}, 너는 패배하여 ${nowReward}코인을 잃었어!`);
                                roulette = false;
                                continued = false;
                                nowRound = 1;
                                saveUser = {id: user.id, name: user.name, date: user.date, money: user.money - nowReward - bettingCoins, xp: user.xp};
                                fs.writeFileSync(filePath, JSON.stringify(saveUser));
                            }
                        }
                        else if (nowRound == 5) {
                            if (final_round > 4) {
                                message.channel.send(`🥳 놀라워 ${message.author.username}, 너는 모든 라운드에서 살아남았고, ${Math.floor(bettingCoins * 6.0)}코인을 받았어!`);
                                nowReward = Math.floor(bettingCoins * 4);
                                nowRound = 1;
                                continued = false;
                                roulette = false;
                                saveUser = {id: user.id, name: user.name, date: user.date, money: user.money + bettingCoins * 6 - bettingCoins * 6.0, xp: user.xp};
                                fs.writeFileSync(filePath, JSON.stringify(saveUser));
                            }
                            else {
                                message.channel.send(`☠ ${message.author.username}, 너는 패배하여 ${nowReward}코인을 잃었어!`);
                                roulette = false;
                                continued = false;
                                nowRound = 1;
                                saveUser = {id: user.id, name: user.name, date: user.date, money: user.money - nowReward - bettingCoins, xp: user.xp};
                                fs.writeFileSync(filePath, JSON.stringify(saveUser));
                            }
                        }
                    }, 3000);
                }
            }
        })
        setTimeout(() => {
            if (roulette === true) {
                if (continued === false) {
                    roulette = false;
                    nowRound = 1;
                    message.reply(`룰렛 게임이 너무 오래 지속돼서 종료됐어!`)
                }
            }
        }, 45000);
    }
})





client.on("message", (message) => {
	if(message.content === `${prefix}버튼`) {
	/* Generate a Cute Embed :3 */

    

	 const embed = new Discord.MessageEmbed()
	 .setDescription("테스트")
	 .setColor("GREEN");
 
    /* Generate 1st Button with "Yes" lable on it */
	 const button1 = new buttonClient.MessageButton()
	 .setLabel("Yes")
	 .setStyle("green")
	 .setID("yes")

   /* Generate 2nd Button with "No" label on it */
	 const button2 = new buttonClient.MessageButton()
	 .setLabel("No")
	 .setStyle("red")
	 .setID("no")

   /* Generate 3rd Link Button */
   const button3 = new buttonClient.MessageButton()
   .setLabel("디코섭")
   .setURL("https://discord.gg/Fky6xjXM8J")

     
     /* Send Message with button */
     buttonClient.send(null, { channel: message.channel.id, embed, buttons: [ [button1, button2], [button3] ]})
 }
})


/* Listen to buttons event with their ID */
buttonClient.on("yes", (inta) => {
	inta.message.delete()
	inta.message.reply("ㅎㅎ")
})

buttonClient.on("no", (inta) => {
	inta.message.delete()
	inta.message.reply("ㅗㅗ")
})




client.login(token);
