const discord = require('discord.js');
const UserPFP = message.member.avatarURL();

module.exports = {
    name: "avatar",
    description: "Brodcast someone's avatar",

    run: async (client, message, args) => {
          const embed = new discord.MessageEmbed()
                        .setImage(UserPFP)
                        .setColor("RANDOM")
         message.channel.send(embed);
      }
}