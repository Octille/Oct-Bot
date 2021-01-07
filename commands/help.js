const Discord = require('discord.js');
const colors = require('../colors.json');
const {
    prefix//cdcsdfcds sfsdf esdf

} = require('../config.json');

module.exports = {
    name: 'help',
    description: 'Sends This Very Helpful Message!',
    async execute(message, args, client) {

        const {
            commands
        } = message.client;

        if (!args.length) {
            const embed = new Discord.MessageEmbed()
                .setTitle(`Hypixel Bot Commands`)
                .setColor(colors['MainColor'])
                .setDescription(`My Commands\nBot Prefix: \'${prefix}\'`)
                .addField("Commands:", commands.filter(e => !e.modOnly).filter(e => !e.hiddenCommand).filter(e => !e.notReady).map(command => `**${command.name}** - ${command.description}`).join('\n'))
                .setFooter(`${message.author.tag} | Created by Gurkirat`, message.author.displayAvatarURL({
                    format: 'png',
                    dynamic: true,
                    size: 2048
                }))

            return message.channel.send(embed);
        }

    },
    help: 'Sends this message!'
}

