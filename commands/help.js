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
        .addField(`초대`, '봇의 초대링크를 생성')
        .addField(`${prefix}킥`, '서버에서 유저를 추방 합니다')
        .addField(`${prefix}벤`, '서버에서 유저를 차단 합니다')
        .addField(`${prefix}청소+(1~99)`, '1~99개의 메시지를 삭제합니다')
        .addField(`${prefix}날씨+지역이름`, '그 지역에 날씨를 알려줍니다')
        .setColor("#00b0ff")
        .setTimestamp()

        const page2 = new Discord.MessageEmbed()
        .setTitle('PAGE 2')
        .addField(`${prefix}핑`, '서버와 봇의 핑을 보여줍니다')
        .addField(`${prefix}도움말`, '봇에 명령어를 알려줍니다')
        .addField(`${prefix}투표 "투표1" "투표2"`, '투표를 할수있습니다')
        .addField(`${prefix}유저정보`, '유저의 정보를 보여줍니다(개발중)')
        .addField(`${prefix}뮤트`,'서버에서 유저를 뮤트시킴')
        .setColor("#f50057")
        .setTimestamp()

        const page3 = new Discord.MessageEmbed()
        .setTitle('PAGE 3')
        .addField(`${prefix}재생+링크`,'서버에서 노래를 재생')
        .addField(`${prefix}스킵`,'현재 재생중인 노래를 스킵합니다')
        .addField(`${prefix}일시정지`,'노래를 일시정지합니다(다시 재생은 스킵)')
        .addField(`${prefix}재생목록`,'유튜브 재생목록을 재생')
        .addField(`${prefix}나가`,'봇이 음성채널에서 나감')
        .addField(`${prefix}대기열`,'대기열을 불러온다')
        .setColor("#ffff00")
        .setTimestamp()

        const page4 = new Discord.MessageEmbed()
        .setTitle('PAGE 4')
        .addField(`${prefix}추가 예정`,'추가 예정')
        .addField(`${prefix}추가 예정`,'추가 예정')
        .addField(`${prefix}추가 예정`,'추가 예정')
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
        .addField(`${prefix}추가 예정`,'추가 예정')
        .addField(`${prefix}추가 예정`,'추가 예정')
        .setColor("#d50000")
        .setTimestamp()

        const page6 = new Discord.MessageEmbed()
        .setTitle('PAGE 6')
        .addField(`${prefix}추가 예정`,'추가 예정')
        .addField(`${prefix}추가 예정`,'추가 예정')
        .addField(`${prefix}추가 예정`,'추가 예정')
        .addField(`${prefix}추가 예정`,'추가 예정')
        .addField(`${prefix}추가 예정`,'추가 예정')
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