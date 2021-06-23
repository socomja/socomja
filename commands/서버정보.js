module.exports = {
    name: '서버',
    aliases: ['si'],
    description: "This shows the server info",
    async run (client, message, args) {
        const Discord = require('discord.js');

        const botSize = message.guild.members.cache.filter(m => m.user.bot).size

        const { name, owner, roles, channels, createdAt, premiumSubscriptionCount, memberCount, region } = message.guild
        message.channel.send(
            new Discord.MessageEmbed()
                .setTitle(name)
                .setDescription(`해당 서버의 정보입니다~`)
                .setThumbnail(message.guild.iconURL({ dynamic: true }))
                .addField('소유자', owner, true)
                .addField('부스트', premiumSubscriptionCount, true)
                .addField('지역', region.toUpperCase(), true)
                .addField('총 맴버', memberCount, true)
                .addField('총 봇수', botSize, true) 
                .addField('규칙', roles.cache.size, true)
                .setTimestamp()
                .setColor('#00e676')
                .setTimestamp(createdAt)
        )
            .catch((e) => message.channel.send(`error: ${e.message}`))
    }
}