const Discord = require('discord.js');

module.exports = {
    name: "인증",
    description: "공지에요 공지",

    async run (client, message, args) {
    
    message.member.roles.add("828879477911191552");
    let embed = new Discord.MessageEmbed()
    
    .setAuthor("인증 완료 되었습니다.","https://cdn.discordapp.com/attachments/827820848547233804/864679287146414110/850432197113544735.gif")
    .setTimestamp()
    .setFooter(`${message.author.tag}`, message.author.displayAvatarURL())
    .setColor("#00e676")
    message.channel.send(embed)
    message.react("✅")
  }}