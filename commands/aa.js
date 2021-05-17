module.exports = {
    name: "아야",
    _run: async (client, message, args) => {
        const Discord = require('discord.js')
        const Embed = new Discord.MessageEmbed()
        message.reply(Embed.setImage("https://cdn.discordapp.com/attachments/800912786527092767/821342574035861544/20210316_202047.jpg"))
    },
    get run() {
        return this._run
    },
    set run(value) {
        this._run = value
    },
}