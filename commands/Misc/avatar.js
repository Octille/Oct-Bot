const discord = require('discord.js');

module.exports = {
    name: "avatar",
    description: "Brodcast someone's avatar",

    run: async (client, message, args) => {
          const embed = new discord.MessageEmbed()
                        .setImage(user.avatarURL)
                        .setColor("RANDOM")
         message.channel.send(embed);
      }
}