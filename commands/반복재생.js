const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
 
    name: "반복재생",
    description: "반복재생 (활성/비활성)",
    usage: "loop",
    aliases: ["l"],
  

  run: async function (client, message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
       if (serverQueue) {
            serverQueue.loop = !serverQueue.loop;
            return message.channel.send({
                embed: {
                    color: "GREEN",
                    description: `🔁  **|**  반복재생 **\`${serverQueue.loop === true ? "활성화" : "비활성화"}\`**`
                }
            });
        };
    return sendError("이 서버에서 재생 중인 항목이 없습니다.", message.channel);
  },
};
