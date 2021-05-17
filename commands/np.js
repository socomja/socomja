const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error")

module.exports = {
  
    name: "곡정보",
    description: "To show the music which is currently playing in this server",
    usage: "",
    aliases: ["np"],
  

  run: async function (client, message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return sendError("이 서버에서 재생되고있는 항목이 없습니다..", message.channel);
    let song = serverQueue.songs[0]
    let thing = new MessageEmbed()
    .setAuthor("지금 재생중인 노래", "https://cdn.discordapp.com/attachments/524157791707987976/843691418904297492/Music.gif")
    .setThumbnail(song.img)
    .setColor("#f50057")
    .setDescription(`[${song.title}](${song.url})`,true)
    .addField("재생시간", song.duration, true)
    .addField("곡 추가 한사람", song.req.tag, true)
    .setFooter(`업로드 날짜:  ${song.ago}`);
    return message.channel.send(thing)
  },
};