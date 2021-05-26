module.exports = {
    name: "히마리",
    _run: async (client, message, args) => {
        const Discord = require('discord.js')
        setTimeout(()=>{message.delete()},1)
        const Embed = new Discord.MessageEmbed()
        message.reply(Embed.setImage("https://cdn.discordapp.com/attachments/800912786527092767/820872759680434177/20210315_131427.jpg"))
    },
    get run() {
        return this._run
    },
    set run(value) {
        this._run = value
    },
}