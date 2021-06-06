const { Util, MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  
    name: "스킵",
    description: "To skip the current music",
    usage: "",
    aliases: ["s"],
  

  run: async function (client, message, args) {
    const channel = message.member.voice.channel
    if (!channel)return sendError("죄송하지만 음악을 재생하려면 음성 채널에 있어야 합니다!", message.channel);
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)return sendError("곡을 먼저 추가해 주세요ㅡ.ㅡ;;", message.channel);
        if(!serverQueue.connection)return
if(!serverQueue.connection.dispatcher)return
     if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      let xd = new MessageEmbed()
      .setColor("YELLOW")
      .setTitle("▶노래를 이어서 재생합니다~")
       
   return message.channel.send(xd).catch(err => console.log(err));
      
    }


       try{
      serverQueue.connection.dispatcher.end()
      } catch (error) {
        serverQueue.voiceChannel.leave()
        message.client.queue.delete(message.guild.id);
        return sendError(`:참고: 플레이어가 중지되고 대기열이 지워졌습니다..: ${error}`, message.channel);
      }
    message.react("✅")
  },
};
