const discord = require('discord.js')

module.exports = {
  name: 'avatar',
  aliases: ['icon', 'pfp', 'profilepic'],
  description: 'Return a user(s) avatar picture!',

  run: async (client, message, args) => {
    const user = message.mentions.users.size

    const embed = new discord.MessageEmbed()
    .setTitle('Your Avatar')
    .setDescription(`${message.author.displayAvatarURL({ dynamic: true })}`)

    const embed1 = new discord.MessageEmbed()
    .setTitle(`${user.username}'s Avatar`)
    .setDescription(`${user.displayAvatarURL({ dynamic: true })}`)


  

      if (!message.mentions.users.size) {
          return message.channel.send(embed);
      }

      const avatar_list = message.mentions.users.map(user => {
          return message.channel.send(embed1);
      });

  }
}