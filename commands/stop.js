const { MessageEmbed } = require("discord.js");


module.exports = {
  
    name: "스탑",
    description: "To stop the music and clearing the queue",
    usage: "",
    aliases: ["sp"],
  

  run: async function (client, message, args) {
    const channel = message.member.voice.channel
    if (!channel)return sendError("죄송하지만 커맨드를 사용하려면 음성 채널에 있어야 합니다!", message.channel);
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)return sendError("멈출수 있는게 아무것도 없네요", message.channel);
   if(!serverQueue.connection)return
if(!serverQueue.connection.dispatcher)return
     try{
      serverQueue.connection.dispatcher.end();
      } catch (error) {
        message.guild.me.voice.channel.leave();
        message.client.queue.delete(message.guild.id);
        return sendError(`:notes: The player has stopped and the queue has been cleared.: ${error}`, message.channel);
      }
    message.client.queue.delete(message.guild.id);
    serverQueue.songs = [];
    message.react("✅")
  },
};