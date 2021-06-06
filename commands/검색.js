const { Util, MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const { play } = require("../util/playing");
const yts = require("yt-search");
const YouTube = require("youtube-sr");
const sendError = require("../util/error");
const scdl = require("soundcloud-downloader").default;
module.exports = {
    
        name: "검색",
        description: "To search songs :D",
        usage: "<song_name>",
        aliases: ["sc"],
    

        run: async function (client, message, args) {
            let channel = message.member.voice.channel;
            if (!channel) return sendError("먼저 음성채널에 들어와주세요~", message.channel);
    
            const permissions = channel.permissionsFor(message.client.user);
            if (!permissions.has("CONNECT")) return sendError("음성 채널에 연결할 수 없습니다. 적절한 권한이 있는지 확인하십시오!", message.channel);
            if (!permissions.has("SPEAK")) return sendError("이 음성 채널에서는 말할 수 없습니다. 적절한 권한이 있는지 확인하십시오!", message.channel);
    
            var searchString = args.join(" ");
            if (!searchString) return sendError("검색할 노래를 입력해주세요", message.channel);
    
            var serverQueue = message.client.queue.get(message.guild.id);
            try {
                var searched = await YouTube.search(searchString, { limit: 10 });
                if (searched[0] == undefined) return sendError("노래를 찾을수 없네요;;", message.channel);
                let index = 0;
                let embedPlay = new MessageEmbed()
                    .setColor("#00e676")
                    .setAuthor(`Results for \"${args.join(" ")}\"`, message.author.displayAvatarURL())
                    .setDescription(`${searched.map((video2) => `**\`${++index}\`  |** [\`${video2.title}\`](${video2.url}) - \`${video2.durationFormatted}\``).join("\n")}`)
                    .setFooter("재생 목록에 추가할 곡의 번호를 입력합니다.");
                // eslint-disable-next-line max-depth
                message.channel.send(embedPlay).then((m) =>
                    m.delete({
                        timeout: 15000,
                    })
                );
                try {
                    var response = await message.channel.awaitMessages((message2) => message2.content > 0 && message2.content < 11, {
                        max: 1,
                        time: 20000,
                        errors: ["time"],
                    });
                } catch (err) {
                    console.error(err);
                    return message.channel.send({
                        embed: {
                            color: "RED",
                            description: "20초 이내에 아무것도 선택하지 않았습니다. 요청이 취소되었습니다..",
                        },
                    });
                }
                const videoIndex = parseInt(response.first().content);
                var video = await searched[videoIndex - 1];
            } catch (err) {
                console.error(err);
                return message.channel.send({
                    embed: {
                        color: "RED",
                        description: "🆘  **|**  검색결과를 찾지 못했습니다",
                    },
                });
            }
    
            response.delete();
            var songInfo = video;
    
            const song = {
                id: songInfo.id,
                title: Util.escapeMarkdown(songInfo.title),
                views: String(songInfo.views).padStart(10, " "),
                ago: songInfo.ago,
                duration: songInfo.durationFormatted,
                url: `https://www.youtube.com/watch?v=${songInfo.id}`,
                img: songInfo.thumbnail.url,
                req: message.author,
            };
    
            if (serverQueue) {
                serverQueue.songs.push(song);
                let thing = new MessageEmbed()
                    .setTitle("대기열에 추가되었습니다~:notes:", )
                    .setThumbnail(song.img)
                    .setColor("#304ffe")
                    .setDescription(`[${song.title}](${song.url})`)
                    .addField("재생시간", song.duration, true)
                    .addField("업로드 날짜", song.ago , true)
                
                    .setFooter(message.author.tag,message.author.displayAvatarURL())
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
            message.client.queue.set(message.guild.id, queueConstruct);
            queueConstruct.songs.push(song);
    
            try {
                const connection = await channel.join();
                queueConstruct.connection = connection;
                play(queueConstruct.songs[0], message);
            } catch (error) {
                console.error(`음성 채널에 참가할 수 없습니다.: ${error}`);
                message.client.queue.delete(message.guild.id);
                await channel.leave();
                return sendError(`음성 채널에 참가할 수 없습니다.: ${error}`, message.channel);
            }
        },
    };
    