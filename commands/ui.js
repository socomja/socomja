const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const moment = require('moment-timezone');
moment.locale('ko-KR');

module.exports = {
    name: "유저정보",
    aliases: ["ì •ë³´", "ë‚´ì •ë³´", "user-info", "user-information", "user", "info-user", "user_info", "ìœ ì €ì •ë³´", "ìœ ì € ì •ë³´"],
    usage: "[id, | mention]",
    category: "information",
    run: async (client, message, args) => {
        let member = message.guild.members.cache.get(args.join(" "));

        if (!member && message.mentions.members) member = message.mentions.members.first();

        if (!member && args.join(" ")) {
            member = message.guild.members.cache.find(member => {
                return member.displayName.toLowerCase().includes(args.join(" ")) ||
                member.user.tag.toLowerCase().includes(args.join(" "))
            });
        }

        if (!member) member = message.member;

        const embed = new MessageEmbed().setTitle(`${member.user.username}님의 정보`).setFooter(member.user.username, member.user.displayAvatarURL()).setThumbnail(member.user.displayAvatarURL()).setColor(member.displayHexColor === "#000000" ? "#FFFFFF" : member.displayHexColor).setTimestamp()
            .setDescription(`**${member.roles.cache.filter(r => r.id !== message.guild.id).map(r => r).join(", ") || "역할없음"}**`).setColor(member.displayHexColor === "#000000" ? "#FFFFFF" : member.displayHexColor)
            .addField(` 이름`, `**${member.user.username}**`)
            .addField(` 서버 별명`, stripIndents`**${member.displayName}**`)
            .addField(` 디스코드 태그`, `**${member.user.tag}**`)
            .addField('유저 아이디', stripIndents`**${member.user.id}**`)

        if (member.user.presence.status !== "offline" && member.user.bot === false) {
            if (member.user.presence.clientStatus.desktop) {
               
            } else if (member.user.presence.clientStatus.web) {
                
                
            }
        }

        embed .addField('가입 날짜', `**${moment(member.user.createdAt).tz('Asia/seoul').format('YYYY년 MM월 DD일 dd요일 h시 m분')}**`)
       
        

        message.channel.send(embed);
        if (member.roles.cache.size !== 0) message.channel.send(embed2);
    }
};