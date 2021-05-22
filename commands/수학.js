module.exports = {
    name: "수학",
    async run (client, message, args) {
        const numbers = [
            "0️⃣",
            "1️⃣",
            "2️⃣",
            "3️⃣",
            "4️⃣",
            "5️⃣",
            "6️⃣",
            "7️⃣",
            "8️⃣",
            "9️⃣",
            "🔟",
        ]
        var a = Math.floor(Math.random() * 9) + 1
        var b = Math.floor(Math.random() * 9) + 1
        var c = Math.floor(Math.random() * 9) + 1
        var d = Math.floor(Math.random() * 9) + 1
        var e = Math.floor(Math.random() * 9) + 1
        var f = Math.floor((a + b - c) * d / e)
        while (0 > f || f > 9) {
            var a = Math.floor(Math.random() * 9) + 1
            var b = Math.floor(Math.random() * 9) + 1
            var c = Math.floor(Math.random() * 9) + 1
            var d = Math.floor(Math.random() * 9) + 1
            var e = Math.floor(Math.random() * 9) + 1
            var f = Math.floor((a + b - c) * d / e)
        }
        const number = numbers[f]
        let filter = (reaction, user) => reaction.emoji.name === number && !user.bot
        message.channel.send("5초 뒤 문제가 나옵니다!").then((th) => { 
            for (let i = 0; i < 11; i++) {
                var n = numbers[i]
                th.react(`${n}`)
            }
            setTimeout(function(){
                th.edit(`문제의 답을 가장 먼저 선택하세요!\n(\`앞에서부터\`계산해주세요!)\n(값이 소수일 때는 소수점 아래를 \`버림\`해 주세요!)\`\`\`diff\n  ${a}\n+ ${b}\n- ${c}\n× ${d}\n÷ ${e}\`\`\``) 
                th.awaitReactions(filter, {
                    max: 1,
                }).then((collected) => {
                    th.edit(`<@${collected.array()[0].users.cache.array()[1].id}>님이 정답을 맞추셨어요!\`\`\`diff\n  ${a}\n+ ${b}\n- ${c}\n× ${d}\n÷ ${e}\n= ${(a + b - c) * d / e}\`\`\``)
                    return th.reactions.removeAll()
                })
            }, 5000)
        })
    },
}