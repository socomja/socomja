const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
    
        name: "스탑",
        aliases: ["goaway", "disconnect"],
        description: "Leave The Voice Channel!",
        usage: "Leave",
   

    run: async function (client, message, args) {
        let channel = message.member.voice.channel;
        if (!channel) return sendError("죄송하지만 음성 채널에 먼저 들어와 주세요!", message.channel);
        if (!message.guild.me.voice.channel) return sendError("지금 들어가 있는 음성채널이 없네요...", message.channel);

        try {
            await message.guild.me.voice.channel.leave();
        } catch (error) {
            await message.guild.me.voice.kick(message.guild.me.id);
            return sendError("음성 채널을 종료하려고 합니다....", message.channel);
        }

        const Embed = new MessageEmbed()
            .setAuthor("음성채널에서 나왔어요", "https://cdn.discordapp.com/attachments/524157791707987976/843691418904297492/Music.gif")
            .setColor("GREEN")
            .setTitle("성공!")
            .setDescription("🎶 음성 채널을 떠났어요")
            .setTimestamp();

        return message.channel.send(Embed).catch(() => message.channel.send("🎶 Left The Voice Channel :C"));
    },
};
