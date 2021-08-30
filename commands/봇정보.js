const Discord = require("discord.js");
  const version = require("../package.json").version;
  const { utc } = require("moment");
  const os = require("os");
  const ms = require("ms");
  module.exports = {
    name: "봇정보",
    description: "Check the info of the bot",
    category: "Utilities",
    async run (client, message, args) {
      const core = os.cpus()[0];
      const embed = new Discord.MessageEmbed()
        .setURL(client.web)
        .setThumbnail(client.user.displayAvatarURL())
        .setColor(message.guild.me.displayHexColor || client.color)
        .addField("General", [
          `**❯ 아이디:** ${client.user.tag} (${client.user.id})`,
          `**❯ 커맨드:** ${client.commands.size}개`,
          `**❯ 들어가있는 서버:** ${client.guilds.cache.size.toLocaleString()}서버 `,
          `**❯ Users:** ${client.guilds.cache
            .reduce((a, b) => a + b.memberCount, 0)
            .toLocaleString()}`,
          `**❯ Channels:** ${client.channels.cache.size.toLocaleString()}`,
          `**❯ 만든날:** ${utc(client.user.createdTimestamp).format(
            "Do MMMM YYYY HH:mm:ss"
          )}`,
          `**❯ Node.js:** ${process.version}`,
          `**❯ 버전:** v${version}`,
          `**❯ Discord.js:**`,
          "\u200b",
        ])
        .setColor(client.color)
        .addField("System", [
          `**❯ os:** 윈도우11`,
          `**❯ 업타임:** ${ms(os.uptime() * 1000, { long: true })}`,
          `**❯ CPU:**`,
          `\u3000 코어: ${os.cpus().length}`,
          `\u3000 모델: ${core.model}`,
          `\u3000 속도: ${core.speed}MHz`,
        ])
        .setTimestamp()
        .setColor("#00e676")
      message.channel.send(embed);
    },
  };