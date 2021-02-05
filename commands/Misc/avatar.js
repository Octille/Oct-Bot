const discord = require('discord.js');


module.exports = {
    name: "avatar",
    description: "Brodcast someone's avatar",

    run: async (client, message, args) => {
        const UserPFP = message.member.avatarURL();
          const embed = new discord.MessageEmbed()
                        .setImage(UserPFP)
                        .setColor("RANDOM")
         message.channel.send(embed);
      }
}