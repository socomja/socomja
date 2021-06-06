const Discord = require('discord.js');

module.exports = {
    name: "별명변경",
    description: "Embed print",

    async run (client, message, args) {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!args[0]) return message.channel.send('사용자를 멘션해주세요.');

        if(!member) return message.channel.send('해당 사용자를 찾을수 없습니다.');
        
        let reason = args.slice(1).join(" ");
        if(!reason) reason = '이름을 지정해주세요'
        if(reason === undefined || reason === 0) return message.channel.send('*이름을 지정해주세요*')
        member.setNickname(reason)
        message.channel.send(`완료하였습니다!`)
        message.react('✔️')
        
    }
}