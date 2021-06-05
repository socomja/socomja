const discord  = require("discord.js");
const canvacord = require("canvacord");
const Levels = require('discord-xp');

module.exports = {
    name: "rank",
    async run (client, message, args) {
        const target = message.mentions.users.first() || message.author; // Grab the target.

        const user = await Levels.fetch(target.id, message.guild.id); // Selects the target from the database.
        
const neededXp = Levels.xpFor(parseInt(user.level) + 1);

        if (!user) return message.channel.send("Seems like this user has not earned any xp so far."); // If there isnt such user in the database, we send a message in general.
        
        //message.channel.send(`> **${target.tag}** is currently level ${user.level}.`); // We show the level.
        const rank = new canvacord.Rank()
    .setAvatar(message.author.displayAvatarURL({dynamic : false, format : 'ping'}))
    .setCurrentXP(user.xp)
    .setRequiredXP(neededXp)
    .setStatus(message.author.presence.Status, true , true)
    setRank(user.position)
    setLevel(user.level)
    .setProgressBar("#00e676", "COLOR")
    .setUsername(message.author.setUsername)
    .setDiscriminator(message.author.Discriminator);
    
    rank.build()
    .then(data => {
        const attachment = new Discord.MessageAttachment(data, "RankCard.png");
        message.channel.send(attachment);
    });
    }
}
 