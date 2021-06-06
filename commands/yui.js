module.exports = {
    name: "유이",
    _run: async (client, message, args) => {
        const Discord = require('discord.js')
        const Embed = new Discord.MessageEmbed()
        message.reply(Embed.setImage("https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxOTExMTdfNjAg%2FMDAxNTczOTkyNTU1OTU2.rniAuOU8SwTpH-o9tOz3Aux_WvtdvEROuhcYqood3rMg.VV3WrpuEFQlIf4pp0eGNegQoBK-1xDrj9itTfiepyS8g.JPEG.kmk090204%2Fe6e030953c14ff2b34a5a6d3f8fd1211.jpg&type=sc960_832"))
    },
    get run() {
        return this._run
    },
    set run(value) {
        this._run = value
    },
}