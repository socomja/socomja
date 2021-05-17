const Discord = require('discord.js');

module.exports = {
    name: "경고",
    description: "Bans a member from the server.",
     
      
    async run (client, message, args) {
        setTimeout(()=>{message.delete()},1)
        
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('당신은 이명령어를 사용할 권한이 없습니다')
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send('권한이 없습니다.')

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!args[0]) return message.channel.send('사용자를 멘션해주세요.');

        if(!member) return message.channel.send('해당 사용자를 찾을수 없습니다.');
        if(!member.bannable) return message.channel.send('해당 사용자는 권한이 너무 높습니다.');

        if(member.id === message.author.id) return message.channel.send('자기자신을 아끼세요..!');

        let reason = args.slice(1).join(" ");

        if(!reason) reason = 'Unspecified';

        member.ban(`${reason}`).catch(err => { 
          message.channel.send(`${Member.displayName}님을 경고 완료하였습니다.`)
            console.log(err)
        })

        const banembed = new Discord.MessageEmbed()
        .setTitle('경고 양식')
        .setThumbnail(member.user.displayAvatarURL())
        .addField('경고 당한 유저', member)
        .addField('처리한 관리자', message.author)
        .addField('이유', reason)
        .setFooter('경고 당한 시간', client.user.displayAvatarURL())
        .setTimestamp()
        .setColor('#d50000')
        message.channel.send(banembed);


    },
};