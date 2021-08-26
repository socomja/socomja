const { play } = require("../util/playing");
const { Util, MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const yts = require("yt-search");
const sendError = require("../util/error");
const scdl = require("soundcloud-downloader").default;
module.exports = {
    
        name: "재생",
        description: "To play songs :D",
        usage: "[song]",
    permissions: {
        channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
        member: [],
    },
    aliases: ["p"],
    
        run: async function (client, message, args) {
        
            let channel = message.member.voice.channel;
            if (!channel) return sendError("먼저 음성채널에 들어와주세요~", message.channel);
    
            const permissions = channel.permissionsFor(message.client.user);
            if (!permissions.has("CONNECT")) return sendError("권한이 부족해요...", message.channel);
            if (!permissions.has("SPEAK")) return sendError("이 음성 채널에서는 말할 수 없습니다. 적절한 권한이 있는지 확인하십시오!", message.channel);
    
            var searchString = args.join(" ");
            if (!searchString) return sendError("You didn't poivide want i want to play", message.channel);
            const url = args[0] ? args[0].replace(/<(.+)>/g, "$1") : "";
            var serverQueue = message.client.queue.get(message.guild.id);
    
            let songInfo;
            let song;
            if (url.match(/^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi)) {
                try {
                    songInfo = await ytdl.getInfo(url);
                    if (!songInfo) return sendError("유튜브에서 찾을수 없습니다", message.channel);
                    song = {
                        id: songInfo.videoDetails.videoId,
                        title: songInfo.videoDetails.title,
                        url: songInfo.videoDetails.video_url,
                        img: songInfo.player_response.videoDetails.thumbnail.thumbnails[0].url,
                        duration: songInfo.videoDetails.lengthSeconds,
                        ago: songInfo.videoDetails.publishDate,
                        views: String(songInfo.videoDetails.viewCount).padStart(10, " "),
                        req: message.author,
                    };
                } catch (error) {
                    console.error(error);
                    return message.reply(error.message).catch(console.error);
                }
            } else if (url.match(/^https?:\/\/(soundcloud\.com)\/(.*)$/gi)) {
                try {
                    songInfo = await scdl.getInfo(url);
                    if (!songInfo) return sendError("사운드 클라우드에서 노래를 찾을 수 없습니다.", message.channel);
                    song = {
                        id: songInfo.permalink,
                        title: songInfo.title,
                        url: songInfo.permalink_url,
                        img: songInfo.artwork_url,
                        ago: songInfo.last_modified,
                        views: String(songInfo.playback_count).padStart(10, " "),
                        duration: Math.ceil(songInfo.duration / 1000),
                        req: message.author,
                    };
                } catch (error) {
                    console.error(error);
                    return sendError(error.message, message.channel).catch(console.error);
                }
            } else {
                try {
                    var searched = await yts.search(searchString);
                    if (searched.videos.length === 0) return sendError("유튜브에서 해당 노래를 찾을수 없네요", message.channel);
    
                    songInfo = searched.videos[0];
                    song = {
                        id: songInfo.videoId,
                        title: Util.escapeMarkdown(songInfo.title),
                        views: String(songInfo.views).padStart(10, " "),
                        url: songInfo.url,
                        ago: songInfo.ago,
                        duration: songInfo.duration.toString(),
                        img: songInfo.image,
                        req: message.author,
                    };
                } catch (error) {
                    console.error(error);
                    return message.reply(error.message).catch(console.error);
                }
            }
        setTimeout(()=>{message.delete()},1)
        if (serverQueue) {
            serverQueue.songs.push(song);
            let thing = new MessageEmbed()
                .setTitle("대기열에 추가 돼었습니다~:notes:")
                .setThumbnail(song.img)
                .setColor("#1de9b6")
                .setDescription(`[${song.title}](${song.url})`,true)
                .addField("재생시간", song.duration, true)
                .addField("업로드 날짜", song.ago , true)
                .setFooter(song.req.tag,song.req.displayAvatarURL())
            return message.channel.send(thing);
        }

        const queueConstruct = {
            textChannel: message.channel,
            voiceChannel: channel,
            connection: null,
            songs: [],
            volume: 100,
            playing: true,
            loop: false,
        };
        queueConstruct.songs.push(song);
        message.client.queue.set(message.guild.id, queueConstruct);

        try {
            const connection = await channel.join();
            queueConstruct.connection = connection;
            play(queueConstruct.songs[0], message);
        } catch (error) {
            console.error(`음성채널에 들어갈수 없네요: ${error}`);
            message.client.queue.delete(message.guild.id);
            await channel.leave();
            return sendError(`음성채널에 들어갈수 없네요: ${error}`, message.channel);
        }
    },




SlashCommand: {
    options: [
        {
            name: "song",
            value: "song",
            type: 3,
            required: true,
            description: "Play music in the voice channel",
        },
    ],
},
};