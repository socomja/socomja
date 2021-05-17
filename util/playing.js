const { Util, MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const ytdlDiscord = require("discord-ytdl-core");
const sendError = require("../util/error");
const scdl = require("soundcloud-downloader").default;

module.exports = {
    async play(song, message) {
        const queue = message.client.queue.get(message.guild.id);
        if (!song) {
           
            let thing = new MessageEmbed()
        .setTitle("재생할수 있는 곡이 없네요...")
        .setColor("#1de9b6");
        queue.textChannel.send(thing);
            
            message.guild.me.voice.channel.leave(); 
            message.client.queue.delete(message.guild.id);
            return;
        }
        let stream;
        let streamType;

        try {
            if (song.url.includes("soundcloud.com")) {
                try {
                    stream = await scdl.downloadFormat(song.url, scdl.FORMATS.OPUS, client.config.SOUNDCLOUD);
                } catch (error) {
                    stream = await scdl.downloadFormat(song.url, scdl.FORMATS.MP3, client.config.SOUNDCLOUD);
                    streamType = "unknown";
                }
            } else if (song.url.includes("youtube.com")) {
                stream = await ytdlDiscord(song.url, { filter: "audioonly", quality: "highestaudio", highWaterMark: 1 << 25, opusEncoded: true });
                streamType = "opus";
                stream.on("error", function (er) {
                    if (er) {
                        if (queue) {
                            module.exports.play(queue.songs[0], message);
                            return sendError(`An unexpected error has occurred.\nPossible type \`${er}\``, message.channel);
                        }
                    }
                });
            }
        } catch (error) {
            if (queue) {
                queue.songs.shift();
                module.exports.play(queue.songs[0], message);
            }
        }

        queue.connection.on("disconnect", () => message.client.queue.delete(message.guild.id));

        const dispatcher = queue.connection
            .play(stream, { type: streamType })
            .on("finish", () => {
                const shiffed = queue.songs.shift();
                if (queue.loop === true) {
                    queue.songs.push(shiffed);
                }
                module.exports.play(queue.songs[0], message);
            })
            .on("error", (err) => {
                console.error(err);
                queue.songs.shift();
                module.exports.play(queue.songs[0], message);
            });

        dispatcher.setVolumeLogarithmic(queue.volume / 100);

        let thing = new MessageEmbed()
                .setAuthor("지금 재생합니다~", "https://cdn.discordapp.com/attachments/524157791707987976/843691418904297492/Music.gif")
                .setThumbnail(song.img)
                .setColor("#18ffff")
                .setDescription(`[${song.title}](${song.url})`,true)
                .addField("재생시간", song.duration, true)
                .addField("곡 추가 한사람", song.req.tag, true)
                .setFooter(`업로드 날짜:  ${song.ago}`);
        queue.textChannel.send(thing);
    },
};
