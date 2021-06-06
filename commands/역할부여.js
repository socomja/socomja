const { Message } = require('discord.js')

module.exports = {
    name : '역할',
    run : async(client, message, args) => {
        //lets use parameters (optional)
        /**
         * @param {Message} message
         */
         if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('당신은 이명령어를 사용할 권한이 없습니다')
         if(!message.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send('권한이 없습니다.')
       
        //next we define some variables
        const target = message.mentions.members.first() //member = mentions
        if(!target) return message.channel.send('사용자를 맨션해주세요') //when no member is pinged
        
        let reason = args.slice(1).join(" ");

        if(!reason) reason = 'Unspecified';

        let role = message.guild.roles.cache.find(r=> r.name === reason)
        //now the code!
        await target.roles.add(role) // adding the role to the user
        message.channel.send(`${target.user.username}님에게 역할을 부여했어요!`)
    }
}