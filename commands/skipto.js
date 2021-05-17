const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  
    name: "건너뛰기",
    description: "Skip to the selected queue number",
    usage: "skipto <number>",
    aliases: ["st"],
  

  run: async function (client, message, args) {
    if (!args.length || isNaN(args[0]))
      return message.channel.send({
                        embed: {
                            color: "GREEN",
                            description: `**Usage**: \`${client.config.prefix}skipto <number>\``
                        }
   
                   }).catch(console.error);
        

    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return sendError("대기열이 없습니다..",message.channel).catch(console.error);
    if (args[0] > queue.songs.length)
      return sendError(`대기열만 있습니다. ${queue.songs.length} 노래가 깁니다.!`,message.channel).catch(console.error);

    queue.playing = true;

    if (queue.loop) {
      for (let i = 0; i < args[0] - 2; i++) {
        queue.songs.push(queue.songs.shift());
      }
    } else {
      queue.songs = queue.songs.slice(args[0] - 2);
    }
     try{
    queue.connection.dispatcher.end();
      }catch (error) {
        queue.voiceChannel.leave()
        message.client.queue.delete(message.guild.id);
       return sendError(`:참고: 플레이어가 중지되고 대기열이 지워졌습니다..: ${error}`, message.channel);
      }
    
    queue.textChannel.send({
                        embed: {
                            color: "GREEN",
                            description: `${message.author} ⏭ skipped \`${args[0] - 1}\` songs`
                        }
   
                   }).catch(console.error);
                   message.react("✅")

  },
};
