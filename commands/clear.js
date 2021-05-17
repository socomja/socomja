module.exports = {
    name: "청소",
    run: async (client, message, args) => {
        if(isNaN(args[0])) return message.reply("올바른 값을 입력해주세요")
        const MessageCount = parseInt(args[0])
        if(MessageCount < 0 || MessageCount > 99) return message.reply("1 에서 100미만의 수를 입력해주세요")
        message.channel.bulkDelete(MessageCount).then((count)=>{
            message.reply(`성공적으로 ${count.size}개의 메세지를 삭제했습니다`).then((message)=>{
                setTimeout(()=>{message.delete()},2000)
            })
        }).catch((error)=>{
            message.reply(`오류가 발생했습니다 오류내용은 다음과 같습니다 : ${error}`)
        })
    }
}