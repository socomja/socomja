const Discord = require('discord.js');

module.exports = {
    name: "공지",
    description: "공지에요 공지",

    async run (client, message, args) {
       

        const permission = new Discord.MessageEmbed()
        .setDescription('관리자만 사용할수 있습니다')
        setTimeout(()=>{message.delete()},1)
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(permission)
        

        let reason = args.slice(0).join(" ");

        if(!reason) reason = '내용을 입력해주세요.';

       

        const embed = new Discord.MessageEmbed()
        .setTitle(':loudspeaker:공지사항')
        
        .setDescription(reason)
        .setFooter(`${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp()
        .setColor('#00e676')    
        
        
        message.channel.send(embed);


    }
};