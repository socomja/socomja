require("dotenv").config();
const fs = require("fs");

const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token,  } = require("./config.json");

const { readdirSync } = require('fs');
const { join } = require('path');
const { executionAsyncResource } = require('async_hooks');
const ytdl = require('ytdl-core');
const bot = new Discord.Client();
const pagination = require('discord.js-pagination');
const { Collection, Client } = require("discord.js");

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
      client.user.setActivity("제작자ㅣ자서#8302")
      await sleep(4000)
      client.user.setActivity("디스코드ㅣEHbhnz5B4P")
      await sleep(4000)
      client.user.setActivity("%도움말")
      await sleep(4000)
      client.user.setActivity("[AD]뮤직봇도 많이 이용해주세요~")
      await sleep(4000)
      client.user.setActivity("문의는 봇에게 디엠 해주세요")
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

client.on("message",  message => {if(message.content == `${prefix}인증`) {
    message.delete();
    message.member.roles.add("828879477911191552");
    let embed = new Discord.MessageEmbed()
    .setDescription(`${message.author.username}님 인증 완료 되었습니다.`)
    .setTimestamp()
    message.channel.send(embed)
  }})

  client.on('message', message => {
    if(message.content.startsWith(`${prefix}공지`)) {
      try{
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`${message.author.username}님은 명령어를 사용할 권한이 없습니다.`) //메시지 관리권한이 있는 유저만 사용가능
      let content = message.content.slice('공지 '.length);
      let img = message.author.displayAvatarURL({dynamic: true})
      
      let reason = args.slice(1).join(" ");

      if(!reason) reason = 'Unspecified';
      
      let embed = new Discord.MessageEmbed()
      .setTitle('📌 | 공지사항')
      .setDescription("@everyone")
      .addField(`**${reason}**`, `${message.author.tag} 님이 공지를 전송했습니다.`)
      .setFooter(message.author.tag, img)
      .setTimestamp()
      .setColor('RANDOM')    
      client.channels.cache.get('').send(embed) // 공지가 포함된 embed를 전송함
      client.channels.cache.get('').send('@everyone') //모두를 멘션함
      message.reply('메시지가 전송되었습니다.');
    }catch(err) {
      message.delete();
      message.channel.send("오류가 발생했습니다.")
      }
    }
  });

 

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
    if(message.content === '아야') {
        message.channel.send(
            embed = new Discord.MessageEmbed()
            .setTitle('뱅드림 Pastel Pallets의 보컬')
            .addField("본명","마루야마 아야")
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

client.on('messageUpdate', async(oldMessage, newMessage) => {
    if(oldMessage.content === newMessage.content) return 
    oldMessage.channel.send(
        embed = new Discord.MessageEmbed()
       .setDescription(`<@!${oldMessage.author.id}> 님이 \`${oldMessage.content}\` 를 \`${newMessage.content}\` 로 수정했어요~!`)
       .setColor('#ffff00')
       )
})

client.on('message', (message) => {
    if(message.content === '루카루카') {
        message.reply(embed = new Discord.MessageEmbed()
        .setDescription('[루카★루카 나이트피버~](https://youtu.be/lT_cJxZpMZU)')
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
            .setDescription('아 그 <@!477448050982518784>님이 매일 스토킹하는 애요?(얼마나 좋아하길레 스토킹을;;)')
            .setColor('RANDOM')
            )

        message.reply(
            embed = new Discord.MessageEmbed()
            .setTitle("")
            .setDescription('<@!477448050982518784>님 그래서 고백은 언제 하실껀가용?(차일것같지만요...)')
            .setColor('RANDOM')
            )

            message.reply(
                embed = new Discord.MessageEmbed()
                .setTitle("")
                .setDescription('<@!477448050982518784>님 만약 "박지율"이 고백하면 받으실껀가용? ㅋㅋㅋ ')
                .setColor('RANDOM')
                )

}});




client.login(token);
