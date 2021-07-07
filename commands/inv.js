const { MessageEmbed } = require("discord.js");

module.exports = {
  
    name: "봇초대",
    description: "To add/invite the bot to your server",
    usage: "[invite]",
    aliases: ["inv"],
  

  run: async function (client, message, args) {
    
    //set the permissions id here (https://discordapi.com/permissions.html)
    var permissions = 37080128;
    
    let invite = new MessageEmbed()
    .setTitle(`초대 ${client.user.username}`)
    .setDescription(`제가 당신의 서버에 있기를 원하십니까? 지금 초대해 주세요! \n\n [초대링크](https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=${permissions}&scope=bot)`)
    .setURL(`https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=${permissions}&scope=bot`)
    .setColor("BLUE")
    return message.channel.send(invite);
  },
};
