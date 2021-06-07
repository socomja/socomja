const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");
const util = require("../util/pagination");

module.exports = {
    
        name: "대기열",
        description: "To show the server songs queue",
        usage: "",
        aliases: ["q", "list", "songlist", "song-list"],
    
    run: async function (client, message, args) {
        const permissions = message.channel.permissionsFor(message.client.user);
        if (!permissions.has(["MANAGE_MESSAGES", "ADD_REACTIONS"])) return sendError("메시지를 관리하거나 응답을 추가할 수 있는 권한이 없습니다.", message.channel);

        const queue = message.client.queue.get(message.guild.id);
        if (!queue) return sendError("이 서버에서 재생되고있는 항목이 없습니다..", message.channel);

        const que = queue.songs.map((t, i) => `\`${++i}.\` | [\`${t.title}\`](${t.url}) - [<@${t.req.id}>]`);

        const chunked = util.chunk(que, 10).map((x) => x.join("\n"));

        const embed = new MessageEmbed()
            .setAuthor("서버 노래 대기열입니다.", "https://cdn.discordapp.com/attachments/524157791707987976/843691418904297492/Music.gif")
            .setThumbnail(message.guild.iconURL())
            .setColor("#00e676")
            .setDescription(chunked[0])
            .addField("지금 재생중", `[${queue.songs[0].title}](${queue.songs[0].url})`, true)
            .addField("텍스트 채널", queue.textChannel, true)
            .addField("음성채널", queue.voiceChannel, true)
            .setFooter(`현재 서버 볼륨은 다음과 같습니다. ${queue.volume} Page 1 of ${chunked.length}.`);
        if (queue.songs.length === 1) embed.setDescription(`No songs to play next add songs by \`\`${message.client.config}play <song_name>\`\``);

        try {
            const queueMsg = await message.channel.send(embed);
            if (chunked.length > 1) await util.pagination(queueMsg, message.author, chunked);
        } catch (e) {
            msg.channel.send(`오류가 발생했습니다.: ${e.message}.`);
        }
    },
};
