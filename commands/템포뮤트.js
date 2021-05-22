const Discord = require("discord.js")
const Embed = new Discord.MessageEmbed()
const MuteName = "Muted"

module.exports = {
    name: "템포뮤트",
    async run(message, args) {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('당신은 저를 관리할 수 없습니다.')
        let mutee = message.mentions.members.first();
        const embedMute = new Discord.MessageEmbed();
        if (!mutee) return message.channel.send("침묵시킬 사용자를 입력해주세요.");
        let reason = args.slice(3).join(" ");
        if (!reason) reason = "사유 없음"
        let muterole = message.channel.guild.roles.cache.find(r => r.name == "Muted")
        if (!muterole) {
        try {
                muterole = await message.guild.roles.create({
                    data: {
                        name: "Muted",
                        color: '#A4A4A4',
                    },
                    reason: reason,
                }) 
                muterole.setPermissions(new Discord.BitField(0));
                message.guild.channels.cache.forEach(async (channel, id) => {
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        SEND_TTS_MESSAGES: false,
                        ATTACH_FILES: false,
                        SPEAK: false
                    })
                })
            } catch (e) {
                console.log(e.stack)
            }
        }

        if(isNaN(args[1])) {
            return message.channel.send("숫자값을 입력해주세요.")
        } if (!args[2] || args[2] == "초") {
            if (args[1] > 43200){
                return message.channel.send("43200초 이하의 값을 입력해주세요.")
            } else {
                mutee.roles.add(muterole.id)
                message.channel.send(Embed.setColor(0xFF90FF).setTitle(`**${mutee.user.username}** 유저를 ${args[1]}초간 침묵시켰습니다.`).setDescription(`사유: ${reason}`).setTimestamp())
                
                setTimeout(function(){
                    let member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[1]))

                    let role = message.guild.roles.cache.find((role) => role.name === MuteName)
                    let muteembed = embedMute.setColor(0xFF90FF).setAuthor(`${member.user.tag} 유저의 침묵을 해제했습니다.`).setTimestamp()
                        
                    member.roles
                    .remove(role.id)
                    .then(() => {
                        message.channel.send({ embed: muteembed })
                    })
                }, (args[1] * 1000))
            }
        } if (args[2] == "분") {
            if (args[1] > 720){
                return message.channel.send("720분 이하의 값을 입력해주세요.")
            } else {
                mutee.roles.add(muterole.id)
                message.channel.send(Embed.setColor(0xFF90FF).setTitle(`**${mutee.user.username}** 유저를 ${args[1]}분간 침묵시켰습니다.`).setDescription(`사유: ${reason}`).setTimestamp())
                    
                setTimeout(function(){
                    let member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[1]))

                    let role = message.guild.roles.cache.find((role) => role.name === MuteName)
                    let muteembed = embedMute.setColor(0xFF90FF).setAuthor(`${member.user.tag} 유저의 침묵을 해제했습니다.`).setTimestamp()
            
                    member.roles
                    .remove(role.id)
                    .then(() => {
                        message.channel.send({ embed: muteembed })
                    })
                }, (args[1] * 60000))
            }
        } if (args[2] == "시간") {
            if (args[1] > 12){
                return message.channel.send("12시간 이하의 값을 입력해주세요.")
            } else {
                mutee.roles.add(muterole.id)
                message.channel.send(Embed.setColor(0xFF90FF).setTitle(`**${mutee.user.username}** 유저를 ${args[1]}시간 침묵시켰습니다.`).setDescription(`사유: ${reason}`).setTimestamp())
                    
                setTimeout(function(){
                    let member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[1]))

                    let role = message.guild.roles.cache.find((role) => role.name === MuteName)
                    let muteembed = embedMute.setColor(0xFF90FF).setAuthor(`${member.user.tag} 유저의 침묵을 해제했습니다.`).setTimestamp()
            
                    member.roles
                    .remove(role.id)
                    .then(() => {
                        message.channel.send({ embed: muteembed })
                    })
                }, (args[1] * 3600000))
            }
        } if (args[2] == "일") {
            if (args[1] > 14){
                return message.channel.send("14일 이하의 값을 입력해주세요.")
            } else {
                mutee.roles.add(muterole.id)
                message.channel.send(Embed.setColor(0xFF90FF).setTitle(`**${mutee.user.username}** 유저를 ${args[1]}일간 침묵시켰습니다.`).setDescription(`사유: ${reason}`).setTimestamp())
                
                setTimeout(function(){
                    let member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[1]))

                    let role = message.guild.roles.cache.find((role) => role.name === MuteName)
                    let muteembed = embedMute.setColor(0xFF90FF).setAuthor(`${member.user.tag} 유저의 침묵을 해제했습니다.`).setTimestamp()
            
                    member.roles
                    .remove(role.id)
                    .then(() => {
                        message.channel.send({ embed: muteembed })
                    })
                }, (args[1] * 86400000))
            }
        }
    }
}