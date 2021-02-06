const discord = require('discord.js')

module.exports = {
  name: 'avatar',
  aliases: ['icon', 'pfp', 'profilepic'],
  description: 'Return a user(s) avatar picture!',

  run: async (client, message, args) => {

    const embed = discord.MessageEmbed()
    .setTitle('Your Avatar')
    .setdescription(`${message.author.displayAvatarURL({ dynamic: true })}`)

    const embed1 = discord.MessageEmbed()
    .setTitle(`${user.username}'s Avatar`)
    .setdescription(`${user.displayAvatarURL({ dynamic: true })}`)


  

      if (!message.mentions.users.size) {
          return message.channel.send(embed);
      }

      const avatar_list = message.mentions.users.map(user => {
          return message.channel.send(embed1);
      });

  }
}