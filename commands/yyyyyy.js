module.exports = {
    name: "임베드1",
    _run: async (client, message, args) => {
        const Discord = require('discord.js')
        const Embed = new Discord.MessageEmbed()
        message.reply(
            Embed.setTitle("임베드")
        .setDescription(`쩝`)
        .setColor('#ffff00')
        )},
    get run() {
        return this._run
    },
    set run(value) {
        this._run = value
    },
}