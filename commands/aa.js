module.exports = {
    name: "아야",
    _run: async (client, message, args) => {
        const Discord = require('discord.js')
        setTimeout(()=>{message.delete()},0)
        const Embed = new Discord.MessageEmbed()
        message.reply(Embed.setImage("https://cdn.discordapp.com/attachments/825982538040082442/846262590505222154/Screenshot_20210504-190351.jpg").setColor("#1de9b6"))
    },
    get run() {
        return this._run
    },
    set run(value) {
        this._run = value
    },
}