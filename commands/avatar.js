const Discord = require('discord.js');

module.exports = {
    name: "avatar",
    description: "Brodcast someone's avatar",

    async run (client, message, args) {
        const user = message.mentions.users.first() || message.author;
        const avatarEmbed = new Discord.RichEmbed()
            .setColor(0x333333)
            .setAuthor(user.username)
            .setImage(user.avatarURL);
        message.channel.send(avatarEmbed);
    }
}