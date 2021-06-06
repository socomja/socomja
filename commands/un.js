const { Message } = require('discord.js')

module.exports=  {
    name : '언뮤트', 
    /**
     * @param {Message} message
     */
    run : async(client, message, args) => {
        const channel = message.client.channels.cache.get('792963172805246976')
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if(!Member) return message.channel.send('해당 유저를 찾을수 없습니다')

        const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === '뮤트');

        await Member.roles.remove(role)

        message.channel.send(`${Member.displayName} 님의 뮤트가 해체돼었습니다.`)
    }
}