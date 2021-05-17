const pagination = require('discord.js-pagination');
const Discord = require('discord.js');
const {prefix} = require('../config.json')


module.exports = {
    name: "도움말",
    description: "The help command, what do you expect?",
    usage: "",
    aliases: ["help", "도움말", "명령어"],

    async run (client, message, args){

        const page1 = new Discord.MessageEmbed()
        .setTitle('PAGE 1')
        .addField(`${prefix}킥`, '서버에서 유저를 추방 합니다')
        .addField(`${prefix}벤`, '서버에서 유저를 차단 합니다')
        .addField(`${prefix}청소`, '메시지를 삭제합니다(개발중)')
        .addField(`${prefix}play (링크) `, '재생 유튜브 링크를 하면 노래를 틀어줍니다')
        .setColor("#00b0ff")
        .setTimestamp()

        const page2 = new Discord.MessageEmbed()
        .setTitle('PAGE 2')
        .addField(`초대`, 'https://discord.com/api/oauth2/authorize?client_id=805015418149666826&permissions=8&scope=bot')
        .addField(`${prefix}날씨`, '그 지역에 날씨를 알려줍니다(개발중)')
        .addField(`${prefix}도와줘`, '봇에 명령어 등등을 알려줍니다')
        .addField(`${prefix}투표`, '투표를 할수있습니다')
        .setColor("#f50057")
        .setTimestamp()

        const page3 = new Discord.MessageEmbed()
        .setTitle('PAGE 3')
        .addField(`${prefix}핑`, '서버와 봇의 핑을 보여줍니다')
        .addField(`${prefix}유저정보`, '유저의 정보를 보여줍니다(개발중)')
        .addField(`${prefix}추가 예정`,'추가 예정')
        .addField(`${prefix}추가 예정`,'추가 예정')
        .setColor("#ffff00")
        .setTimestamp()

        const page4 = new Discord.MessageEmbed()
        .setTitle('PAGE 4')
        .addField(`${prefix}추가 예정`,'추가 예정')
        .addField(`${prefix}추가 예정`,'추가 예정')
        .addField(`${prefix}추가 예정`,'추가 예정')
        .setColor("#64ffda")
        .setTimestamp()

        const page5 = new Discord.MessageEmbed()
        .setTitle('PAGE 5')
        .addField( `${prefix}추가 예정`,'추가 예정')
        .addField( `${prefix}추가 예정`,'추가 예정')
        .addField(`${prefix}추가 예정`,'추가 예정')
        .addField(`${prefix}추가 예정`,'추가 예정')
        .setColor("#d50000")
        .setTimestamp()

        const page6 = new Discord.MessageEmbed()
        .setTitle('PAGE 6')
        .addField(`${prefix}추가 예정`,'추가 예정')
        .setColor("#18ffff")
        .setTimestamp()

        const pages = [
                page1,
                page2,
                page3,
                page4,
                page5,
                page6
        ]

        const emojiList = ["⏪", "⏩"];

        const timeout = '240000';

        pagination(message, pages, emojiList, timeout)
    }
}