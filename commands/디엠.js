const {prefix} = require('../config.json')
const Discord = require('discord.js');
module.exports = {

name: "디엠",
    description: "Bans a member from the server.",
     
      
    async run (client, message, args) {
        setTimeout(()=>{message.delete()},1)
       
        
        
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(
            Embed = new Discord.MessageEmbed()
        .setTitle("관리자만 사용 가능합니다")
        .setColor('#ff1744'))
      
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!args[0]) return message.channel.send('사용자를 멘션해주세요.');
        if(!member) return message.channel.send('해당 사용자를 찾을수 없습니다.');

        
        
        let reason = args.slice(1).join(" ");

        if(!reason) reason = '아무말안함';

        const dmembed = new Discord.MessageEmbed()
        .setTitle("📌디엠도착!")
        .addField(`${message.author.tag}님에게서 디엠이 도착했습니다`,`**${reason}**`)
        .setFooter(member.user.username, member.user.displayAvatarURL())
        .setTimestamp()
        .setColor('#1de9b6')
        member.send(dmembed)
        message.channel.send("전송완료!")
      
    }
};