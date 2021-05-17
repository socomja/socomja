module.exports = {
    name: "카논",
    _run: async (client, message, args) => {
        const Discord = require('discord.js')
        const Embed = new Discord.MessageEmbed()
        message.reply(Embed.setImage("https://cdn.discordapp.com/attachments/801046026743316480/820866144901791754/8fd5568edad98098.jpg"))
    },
    get run() {
        return this._run
    },
    set run(value) {
        this._run = value
    },
}

