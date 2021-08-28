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
        msg.delete({ timeout: 7500 })
        setTimeout(()=>{message.delete()},10)
        const results = await google.scrape(query, 1)
        
        
             Imageembad = new Discord.MessageEmbed()
            .setTitle(`검색항목:${query}`)
            .setImage(results[0].url)
             .setDescription(`[더 많은 항목을 보고싶다면?](https://www.google.com/search?q=${query}&sxsrf=AOaemvKKlC98Vij2zNN4eCD4Lu6WQCm_Gw:1630156438802&source=lnms&tbm=isch&sa=X&ved=2ahUKEwi2ztn75dPyAhWPD94KHTlFCeYQ_AUoAXoECAEQAw&biw=1870&bih=927)`)
            .setColor("#00e676")
            .setFooter(`${message.author.tag}`, message.author.displayAvatarURL())
            
                
                
                message.channel.send(Imageembad)    
                
    }
}