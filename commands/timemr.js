


module.exports = {
    name: '타이머',
    minArgs: 1,
    errormsg: `타이머의 시간을 정해 주세요!
  시간 포맷 : m = 분, h = 시, d = 날`,
    callback: async (message, arguments) => {
      if (!arguments[0].endsWith("d")) {
        if (!arguments[0].endsWith("h")) {
          if (!arguments[0].endsWith("m")) {
            let error = new MessageEmbed()
            .setTitle('오류 ❌')
            .setDescription(`알 수 없는 시간 포맷입니다!
  시간 포맷 : m = 분, h = 시, d = 날`)
            .setColor('FF0000')
            return message.channel.send(error);
          }
        }
      }
      if (isNaN(arguments[0][0])) {
        let error2 = new MessageEmbed()
        .setTitle('오류 ❌')
        .setDescription(`입력하신 값은 숫자가 아닙니다!`)
        .setColor('FF0000')
        return message.channel.send(error2);
      }
      Timers.set(message.author.id + " G " + message.guild.name, {
        Guild: message.guild.name,
        Author: {
          Tag: message.author.tag,
          ID: message.author.id,
        },
        Time: ms(arguments[0]),
      });
  
      const set = new MessageEmbed()
        .setTitle('타이머 설정!')
        .setDescription(`${arguments[0]} 타이머가 설정되었습니다.`)
        .setColor('91FFD1')
        .setTimestamp()
  
      message.channel.send(set);
  
      setTimeout(() => {
      const end = new MessageEmbed()
        .setTitle('타이머 끝!')
        .setDescription(`${arguments[0]} 타이머가 만료되었습니다.`)
        .setColor('91FFD1')
        .setTimestamp()
        message.author.send(end);
        Timers.delete(message.author.id + " G " + message.guild.name);
      }, ms(arguments[0]));
    }
  }