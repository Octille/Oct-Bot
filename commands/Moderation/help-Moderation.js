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
                .setFooter(`${message.author.tag} | Created by AnikoDev`, message.author.displayAvatarURL({
                    format: 'png',
                    dynamic: true,
                    size: 2048
                }))

            return message.channel.send(embed);
        }

    },
    help: 'Sends this message!'
}