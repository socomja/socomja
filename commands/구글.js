

module.exports = {
  name : "구글",
  description : ":flushed:",

  async run(client , message , args ) {
    const Discord = require('discord.js')
    const sentence = args.join("+")
       let sntnce = message.content.split(' ');
    sntnce.shift();
    sntnce = sntnce.join(' ');
    if (!sentence) return message.reply('검색항목을 말해주세요~');
    const aaEmbed = new Discord.MessageEmbed()
      .setTitle('구글 검색결과')
      .setDescription(
        `**검색항목:** ${sntnce}\n\n[검색결과](https://www.google.com/search?q=${sentence}&oq=${sentence}&aqs=chrome.0.69i59l2j0l2j69i60j69i61l2j69i65.1147j0j7&sourceid=chrome&ie=UTF-8)`
      )
      .setColor('GREEN')
      .setFooter( `${message.author.tag}`,message.author.displayAvatarURL());
    message.channel.send(aaEmbed);
  }

}