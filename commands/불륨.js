const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
 
    name: "볼륨",
    description: "To change the server song queue volume",
    usage: "[volume]",
    aliases: ["v", "vol"],
  

  run: async function (client, message, args) {
    const channel = message.member.voice.channel;
    if (!channel)return sendError("죄송하지만 커맨드를 사용하려면 음성 채널에 있어야 합니다!", message.channel);
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return sendError("이 서버에서 재생되는 항목이 없습니다.", message.channel);
    if (!serverQueue.connection) return sendError("There is nothing playing in this server.", message.channel);
    if (!args[0])return message.channel.send(`The current volume is: **${serverQueue.volume}**`);
     if(isNaN(args[0])) return message.channel.send(':notes: Numbers only!').catch(err => console.log(err));
    if(parseInt(args[0]) > 150 ||(args[0]) < 0) return sendError('You can\'t set the volume more than 150. or lower than 0',message.channel).catch(err => console.log(err));
    serverQueue.volume = args[0]; 
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);
    const xd = new MessageEmbed()
    .setDescription(`현재 볼륨: **${args[0]/1}/150**`)
    .setAuthor("서버 볼륨 관리자", "https://cdn.discordapp.com/attachments/524157791707987976/843691418904297492/Music.gif")
    .setColor("BLUE")
    return message.channel.send(xd);
  },
};
