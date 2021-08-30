const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");
const {prefix} = require('../config.json')

module.exports = {
  
    name: "일시정지",
    description: "To pause the current music in the server",
    usage: "[pause]",
    aliases: ["일시정지"],
  

  run: async function (client, message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
	    try{
      serverQueue.connection.dispatcher.pause()
	  } catch (error) {
        message.client.queue.delete(message.guild.id);
        return sendError(`:참고: 플레이어가 중지되고 대기열이 지워졌습니다..: ${error}`, message.channel);
      }	    
      let xd = new MessageEmbed()
      .setDescription(`이어서 재생하려면 ${prefix}스킵을 입력해주세요~`)
      .setColor("YELLOW")
      .setTitle("⏸노래가 일시 정지되었습니다!")
      return message.channel.send(xd);
    }
    return sendError("There is nothing playing in this server.", message.channel);
  },
};
