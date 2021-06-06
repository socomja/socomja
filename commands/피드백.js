const Discord = require("discord.js");

module.exports = {
    name: '피드백',
    aliases: ['feed-back'],
    category: 'Bot reports',
    utilisation: '{prefix}feedback [your report here]. Thanks for your valuable feedback',
async run (client, bot, message, args) {
let feedback = args.slice(0).join(" ");
let user = message.author.username;
let uid = message.author.id;
let guild = message.guild.name;
let gid = message.guild.id;
let channel = bot.channels.cache.get("841552011005657098")
let embed = new Discord.MessageEmbed()
.setTitle(`Feedback Report in Enzo`)
.setThumbnail("https://www.icegif.com/wp-content/uploads/icegif-1.gif")
.addField("Feedback", feedback)
.addField("Feedback By", user)
.addField("Feedback User ID", uid)
.addField("Feedback Guild Name ", guild)
.addField("Feedback Guild ID", gid)
.setColor("YELLOW")
.setTimestamp()
.setFooter("New Feedback Found")

message.reply("**❤️ Your Feedback has been reported in the official server. Thanks for the valuable feedback thanks for supporting us.**")
channel.send(embed).then(i => i.react("💖"))


}
};