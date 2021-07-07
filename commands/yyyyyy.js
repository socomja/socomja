const Discord = require('discord.js')
const fetch = require('node-fetch')


module.exports = {
    name: 'yt',
    description: 'Plays YT videos in voice channel',
    usage: '<prefix>yt-together',
    aliases: ['ytt'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const channel = message.member.voice.channel

        if(!channel) return message.channel.send(
            new Discord.MessageEmbed()
            .setDescription("먼저 음성채널에 들어와 주세요")
            .setColor("#ff0000")
        )

        fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: "755600276941176913",
                target_type: 2,
                temporary : false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ${client.token}`,
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(invite => {
            if(!invite.code) return message.channel.send(
                new Discord.MessageEmbed()
                .setDescription("실행할수없네요.")
                .setColor("#ff0000")
            )
            message.channel.send(`시작하려면 이 링크를 클릭하십시오.\nhttps://discord.com/invite/${invite.code}`)
        })
    }
}