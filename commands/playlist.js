const { Util, MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const yts = require("yt-search");
var ytpl = require("ytpl");
const sendError = require("../util/error");
const { play } = require("../util/playing");
module.exports = {
    
        name: "재생목록",
        description: "재생목록에 있는 노래들을 재생",
        
    

    run: async function (client, message, args) {
        const channel = message.member.voice.channel;
        if (!channel) return sendError("음성채널에 먼저 들어와 주세요", message.channel);
        const url = args[0] ? args[0].replace(/<(.+)>/g, "$1") : "";
        var searchString = args.join(" ");
        const permissions = channel.permissionsFor(message.client.user);
        if (!permissions.has("CONNECT")) return sendError("음성 채널에 연결할 수 없습니다. 적절한 권한이 있는지 확인하십시오.!", message.channel);
        if (!permissions.has("SPEAK")) return sendError("이 음성 채널에서는 말할 수 없습니다. 적절한 권한이 있는지 확인하십시오.!", message.channel);

        if (!searchString || !url) return sendError(`Usage: ${message.client.config.prefix}playlist <YouTube Playlist URL | Playlist Name>`, message.channel);
        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            try {
                const playlist = await ytpl(url.split("list=")[1]);
                if (!playlist) return sendError("Playlist not found", message.channel);
                const videos = await playlist.items;
                for (const video of videos) {
                    // eslint-disable-line no-await-in-loop
                    await handleVideo(video, message, channel, true); // eslint-disable-line no-await-in-loop
                }
                setTimeout(()=>{message.delete()},1)
                return message.channel.send({
                    embed: {
                        color: "GREEN",
                        description: `✅  **|**  재생목록: **\`${videos[0].title}\`** 목록에 추가돼었습니다`,
                    },
                });
            } catch (error) {
                console.error(error);
                return sendError("재생 목록을 찾을 수 없습니다. :(", message.channel).catch(console.error);
            }
        } else {
            try {
                var searched = await yts.search(searchString);

                if (searched.playlists.length === 0) return sendError("유튜브 재생목록을 찾을수 없네요...", message.channel);
                var songInfo = searched.playlists[0];
                let listurl = songInfo.listId;
                const playlist = await ytpl(listurl);
                const videos = await playlist.items;
                for (const video of videos) {
                    // eslint-disable-line no-await-in-loop
                    await handleVideo(video, message, channel, true); // eslint-disable-line no-await-in-loop
                }
                let thing = new MessageEmbed()
                    .setAuthor("재생목록이 대기열에 추가되었습니다~", "https://cdn.discordapp.com/attachments/524157791707987976/843691418904297492/Music.gif")
                    .setThumbnail(songInfo.thumbnail)
                    .setColor("GREEN")
                    .setDescription(`✅  **|**  재생목록: **\`${songInfo.title}\`** 가 추가되었습니다. \`${songInfo.videoCount}\` 대기`);
                return message.channel.send(thing);
            } catch (error) {
                return sendError("예기치 않은 오류가 발생했습니다.", message.channel).catch(console.error);
            }
        }

        async function handleVideo(video, message, channel, playlist = false) {
            const serverQueue = message.client.queue.get(message.guild.id);
            const song = {
                id: video.id,
                title: Util.escapeMarkdown(video.title),
                views: video.views ? video.views : "-",
                ago: video.ago ? video.ago : "-",
                duration: video.duration,
                url: `https://www.youtube.com/watch?v=${video.id}`,
                img: video.thumbnail,
                req: message.author,
            };
            if (!serverQueue) {
                const queueConstruct = {
                    textChannel: message.channel,
                    voiceChannel: channel,
                    connection: null,
                    songs: [],
                    volume: 100,
                    playing: true,
                    loop: false,
                };
                message.client.queue.set(message.guild.id, queueConstruct);
                queueConstruct.songs.push(song);

                try {
                    var connection = await channel.join();
                    queueConstruct.connection = connection;
                    play(queueConstruct.songs[0], message);
                } catch (error) {
                    console.error(`음성 채널에 들어갈수 없습니다.: ${error}`);
                    message.client.queue.delete(message.guild.id);
                    return sendError(`음성 채널에 들어갈수 없습니다: ${error}`, message.channel);
                }
            } else {
                serverQueue.songs.push(song);
                if (playlist) return;
                let thing = new MessageEmbed()
                    .setAuthor("노래가 대기열에 추가되었습니다.", "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
                    .setThumbnail(song.img)
                    .setColor("YELLOW")
                    .addField("Name", song.title, true)
                    .addField("Duration", song.duration, true)
                    .addField("Requested by", song.req.tag, true)
                    .setFooter(message.author.tag,message.author.displayAvatarURL())
                .setColor("#00e676")
                return message.channel.send(thing);
            }
            return;
        }
    },
};
