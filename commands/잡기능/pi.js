const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'pi',
  async run (client, message, arguments) {
    const error = new MessageEmbed()
    .setColor('dc2e44')

    const realpi = `3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679`
    const num = arguments[0]

    if (!num) {
      const simplified = new MessageEmbed()
      .setTitle('Pi (Simplified)')
      .setDescription(`\`\`\`css\n3.14\`\`\``)
      .setColor('141414')
      return message.channel.send(simplified)
    }

    if (isNaN(num)) {
      error.setTitle('Error ❌')
      error.setDescription(`You must enter a number!`)
      return message.channel.send(error)
    }

    if (num > 100 || num < 1) {
      error.setTitle('Error ❌')
      error.setDescription(`Please enter the number between 1 and 100!`)
      return message.channel.send(error)
    }

    if (num.includes('.')) {
      error.setTitle('Error ❌')
      error.setDescription(`Please enter the natural number!`)
      return message.channel.send(error)
    }

    if (num == 1) {
      const pi1 = new MessageEmbed()
      .setTitle(`Pi (To 1 digit)`)
      .setDescription(`\`\`\`css\n3⋯\`\`\``)
      .setColor('141414')
      return message.channel.send(pi1)

    } else if (num > 1) {
      const split = realpi.split('.')
      const slice = split[1].slice(0, num - 1)
      const pi = new MessageEmbed()
      .setTitle(`Pi (Up to ${num} digits)`)
      .setDescription(`\`\`\`css\n3.${slice}⋯\`\`\``)
      .setColor('141414')
      message.channel.send(pi)
    }
  }
}