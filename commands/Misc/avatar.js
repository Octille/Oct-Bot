const Discord = require('discord.js');

module.exports = {
    name: "avatar",
    description: "Brodcast someone's avatar",

    run: async (client, message, args) => {
          const embed = new Discord.RichEmbed()
                        .setImage(user.avatarURL)
                        .setColor("RANDOM")
         message.channel.send({embed});
      }
}