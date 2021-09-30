const anime = require('anime-actions');
const Discord = require('discord.js');

module.exports = {
  name: '스마일',
  description: 'get blush gif',
  async run (client, message, args) {
     const embed = new Discord.MessageEmbed()
         .setTitle(`${message.author.username} blushes...`)
        .setImage(await anime.smile())
        .setColor('#03fcf8')
   message.channel.send(embed)
}
} 