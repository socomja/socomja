module.exports = {
    name: '출첵',
    async run (client, message, args) {
        const fs = require('fs');
        const id = message.author.id;
        const name = message.author.username;
        const filePath = `./daily/${id}.json`;
        const today = new Date();
        const date = "" + today.getFullYear() + today.getMonth() + today.getDate();
        !fs.existsSync(filePath) ? fs.writeFileSync(filePath, JSON.stringify({})) : null;
        const user = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        if (user.date === date) return message.channel.send(`오늘은 이미 출석을 완료하셨습니다.`);
        const saveUser = {
            id,
            name,
            date,
        };
        fs.writeFileSync(filePath, JSON.stringify(saveUser));
        message.channel.send(`출석체크 완료!`)
    }
}