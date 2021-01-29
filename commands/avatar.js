const Discord = require('discord.js');

module.exports = {
    name: "avatar",
    description: "Brodcast someone's avatar",
    async execute(message, args) {
        const user = message.mentions.users.first() || message.author;
    
        const embed = new Discord.MessageEmbed()
          .setTitle("Avatar Request : " + user.username)
          .setImage(user.displayAvatarURL())
          .setColor("GREEN")
          .setFooter(`Requested by ${message.author.username}`)
          .setTimestamp();
    
        message.channel.send(embed);
      },
}