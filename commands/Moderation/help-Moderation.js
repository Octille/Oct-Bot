const Discord = require('discord.js');

module.exports = {
    name: 'help-Moderation',
    async execute(message, args, client) {

        const {
            commands
        } = message.client;

        if (!args.length) {
            const embed = new Discord.MessageEmbed()
                .setTitle(`Moderation Commands`)
                .setColor("RANDOM")
                .setDescription(`My Commands\nBot Prefix: \'${prefix}\'`)
                .addField("Commands:", commands.filter(e => !e.modOnly).filter(e => !e.hiddenCommand).filter(e => !e.notReady).map(command => `**${command.name}** `).join('\n'))


            return message.channel.send(embed);
        }

    },

}