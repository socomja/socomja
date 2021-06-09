
const Discord = require('discord.js');

module.exports = {
    name: "임",
    description: "임배드 출력.",
    usage: "loop",
    aliases: ["임"],
    
    async run (_client, message, args) {

        setTimeout(()=>{message.delete()},0)
       
        const color = args[0]
        const sentences = args.slice(1).join(' ')

        if (!color || !args[1]) {
          return message.channel.send("커맨드의 사용이 틀립니다!\n/임베드 <컬러코드> <할 말>")
        }

        const embed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag}님의 메세지`,message.author.displayAvatarURL())
        .setDescription(`**${sentences}**`)
        .setTimestamp()
        .setColor(`${color}`)

        message.channel.send(embed)
    },

};