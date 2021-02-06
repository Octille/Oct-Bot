const discord = require('discord.js')
const Discord = require("discord.js");

module.exports = {
  name: "avatar",
  description: "get a user's avatar",
  run: async (client, message, args) => {
    const user = message.mentions.users.first() || message.author;

    const embed = new Discord.MessageEmbed()
      .setTitle("Avatar Request : " + user.username)
      .setImage(user.displayAvatarURL())
      .setColor("GREEN")
      .setFooter(`Requested by ${message.author.username}`)
      .setTimestamp();

    message.channel.send(embed);
  },
};