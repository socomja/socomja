module.exports = {
    name: "아논",
    _run: async (client, message, args) => {
        const Discord = require('discord.js')
        const Embed = new Discord.MessageEmbed()
        message.reply(Embed.setImage("https://cdn.discordapp.com/attachments/800912786527092767/820891398315442196/BDgHS0nCElA.png"))
    },
    get run() {
        return this._run
    },
    set run(value) {
        this._run = value
    },
}