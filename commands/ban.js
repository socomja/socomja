module.exports = {
    name: "벤",
    run: async (client, message, args) => {
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply("당신은 권한이 없습니다")
        let User = message.mentions.members.first()
        if(!User) return message.reply("사용자를 찾을 수 없습니다. 다시 멘션해 주세요")
        if(User.hasPermission("BAN_MEMBERS")) return message.reply("본 사용자는 추방 할수 없습니다")
        User.ban(); return message.reply(`성공적으로 ${message.mentions.members.first()} 유저를 추방했습니다`)
    }
}