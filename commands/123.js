module.exports = {
    name: "카논2",
    _run: async (client, message, args) => {
        const Discord = require('discord.js')
        setTimeout(()=>{message.delete()},0)
        const Embed = new Discord.MessageEmbed()
        message.reply(Embed.setImage("https://cdn.discordapp.com/attachments/524157791707987976/820867205013045268/20210315_125306.jpg").setColor("#18ffff"))
    },
    get run() {
        return this._run
    },
    set run(value) {
        this._run = value
    },
}