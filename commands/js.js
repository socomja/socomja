

module.exports = {
  name : "구글검색",
  description : ":flushed:",

  async run(client , message , args ) {
    const Discord = require('discord.js')
    const sentence = args.join("+")
       let sntnce = message.content.split(' ');
    sntnce.shift();
    sntnce = sntnce.join(' ');
    if (!sentence) return message.reply('Please specify a search query.');
    const aaEmbed = new Discord.MessageEmbed()
      .setTitle('You Searched Google')
      .setDescription(
        `**검색항목:** ${sntnce}\n\n **검색 결과** - [링크](https://www.google.com/search?q=${sentence}&oq=${sentence}&aqs=chrome.0.69i59l2j0l2j69i60j69i61l2j69i65.1147j0j7&sourceid=chrome&ie=UTF-8)`
      )
      .setColor('GREEN')
      .setFooter(' ');
    message.channel.send(aaEmbed);
  }

}