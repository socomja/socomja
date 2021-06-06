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

        const results = await google.scrape(query, 1)
        message.channel.send(results[0].url);
    }
}