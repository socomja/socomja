const { Message } = require('discord.js')

module.exports=  {
    name : '역할회수', 
    /**
     * @param {Message} message
     */
     async run (client, message, args) {

        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('당신은 이명령어를 사용할 권한이 없습니다')
        if(!message.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send('권한이 없습니다.')

        const channel = message.client.channels.cache.get('792963172805246976')
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if(!Member) return message.channel.send('해당 유저를 찾을수 없습니다')

        let reason = args.slice(1).join(" ");

        if(!reason) reason = 'Unspecified';

        const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === reason);

        await Member.roles.remove(role)

        message.channel.send(`${Member.displayName} 님의 역할이 회수되었습니다!`)
    }
}