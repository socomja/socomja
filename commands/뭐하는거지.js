const { MessageEmbed } = require(`discord.js`);
const fetch = require(`node-fetch`)
module.exports = {
    name: 'quote',
    aliases: ['getquote'], 
    category: 'fun', 
    usage: '', 
    description: 'get a random quote',
    accessableby: 'everyone',

    run: async(bot, message, args) => {
        const nidhish = require(`nidhishpackage`)
        const quote = await nidhish.generateQuote({
            Color: "#ff0000"
        })
        return message.channel.send(quote);
            }
}