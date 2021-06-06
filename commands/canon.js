module.exports = {
    name: "캐논",
    _run: async (client, message, args) => {
        const Discord = require('discord.js')
        const Embed = new Discord.MessageEmbed()
        message.reply(Embed.setImage("https://cdn.discordapp.com/attachments/800912786527092767/820902167262265354/common.png")
        .setDescription(`[캐논(카논)의 노래가 궁금하다면?](https://www.youtube.com/watch?v=8otXYHSXxtc)`).setColor('#f50057'))
        
    },
    get run() {
        return this._run
    },
    set run(value) {
        this._run = value
    },
}