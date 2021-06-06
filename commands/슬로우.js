const { Client, Message, MessageEmbed} = require('discord.js');

module.exports = {
    name: '슬로우모드',
    description: "slowmode",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {


  
    if (!args[0])
      return message.channel.send(
        `You did not specify the time in seconds you wish to set this channel's slow mode too!`
      );
      
    if (isNaN(args[0])) return message.channel.send(`That is not a number!`);
    
    message.channel.setRateLimitPerUser(args[0]);
    message.channel.send(
      `Set the slowmode of this channel too **${args[0]}**`
    );
  },
};