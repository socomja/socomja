const anime = require('anime-actions');
const Discord = require('discord.js');

module.exports = {
  name: '댄스',
  description: 'dance dance',
  async run (client, message, args) {
     const embed = new Discord.MessageEmbed()
         
        .setImage(await anime.dance())
        .setColor('#03fcf8')
        message.channel.send(embed)
}
} 
