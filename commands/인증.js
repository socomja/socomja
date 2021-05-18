const { Message } = require('discord.js')

module.exports = {
    name : '인증',
    run : async(client, message, args) => {
        //lets use parameters (optional)
        /**
         * @param {Message} message
         */
       
        //next we define some variables
        const target = message.mentions.members.first() //member = mentions
        if(!target) return message.channel.send('누구를 인증 시킬건지') //when no member is pinged
        let role = message.guild.roles.cache.find(r=> r.name === "맴버")
        //now the code!
        await target.roles.add(role) // adding the role to the user
        message.channel.send(`${target.user.username}님을 인증시켰어요!`)
    }
}