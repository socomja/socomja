const {Message, MessageEmbed}= require('discord.js')
const ms = require('ms')

module.exports = {
    name : '뮤트',
    /**
     * @param {Message} message
     */
    run : async(client, message, args) => {
        const channel = message.client.channels.cache.get('792963172805246976')
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('당신은 이 명령을 사용할 권한이 없습니다.')
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!Member) return message.channel.send('멤버를 찾을수 없습니다.')
        const role = message.guild.roles.cache.find(role => role.name.toLowerCase() === '뮤트')
        if(!role) {
            try {
                message.channel.send('해당 뮤트역할을 찾을수 없습니다 다시 설정해주세요.')

                let muterole = await message.guild.roles.create({
                    data : {
                        name : '뮤트',
                        permissions: []
                    }
                });
                message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        Color: Red 
                    })
                });
                message.channel.send('해당 뮤트 역할이 만들어졌습니다.')
            } catch (error) {
                console.log(error)
            }
        };
        let role2 = message.guild.roles.cache.find(r => r.name.toLowerCase() === '뮤트')
        if(Member.roles.cache.has(role2.id)) return message.channel.send(`${Member.displayName} 님이 뮤트 되었어요..!`)
        await Member.roles.add(role2)
        message.channel.send(`${Member.displayName} 님이 뮤트 되었어요...!`)
        
        let reason = args.slice(1).join(" ");

     
    }
}