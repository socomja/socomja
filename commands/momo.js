module.exports = {
    name: "모모",
    _run: async (client, message, args) => {
        const Discord = require('discord.js')
        const Embed = new Discord.MessageEmbed()
        message.reply(Embed.setImage("https://cdn.discordapp.com/attachments/800912786527092767/820906159296872468/common.png")
        .setDescription(`[모모의 노래가 듣고싶다면?](https://www.youtube.com/watch?v=QgVC8kMn_yk)`)
        .setColor('#ffff00')
        )},
    get run() {
        return this._run
    },
    set run(value) {
        this._run = value
    },
}