const Discord = require('discord.js');
const img = require('images-scraper')

const google = new img({
    puppeteer : {
        headless : true,
    }
})

module.exports = {
    name : '이미지',
    async run (client, message, args) {
        const query = args.join(" ")
        if(!query) return message.channel.send('검색항목을 입력해주세요~')
        
        const msg = await message.channel.send('잠시만 기다려주세요~')
        msg.delete({ timeout: 5000 })
        setTimeout(()=>{message.delete()},10)
        const results = await google.scrape(query, 1)
        
        
             Imageembad = new Discord.MessageEmbed()
            .setTitle(query)
            .setImage(results[0].url)
            .setColor("#00e676")
        message.channel.send(Imageembad)    
    }
}