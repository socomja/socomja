const { Message } = require('discord.js')

module.exports = {
    name : '역할부여',
    run : async(client, message, args) => {
        
        /**
         * @param {Message} message
         */
         if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('당신은 이명령어를 사용할 권한이 없습니다')
         if(!message.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send('권한이 없습니다.')
       
     
        const target = message.mentions.members.first() 
        if(!target) return message.channel.send('사용자를 맨션해주세요')
        let reason = args.slice(1).join(" ");

        if(!reason) reason = 'Unspecified';

        let role = message.guild.roles.cache.find(r=> r.name === reason)
       
        await target.roles.add(role)
        message.channel.send(`${target.user.username}님에게 역할을 부여했어요!`)
    }
}