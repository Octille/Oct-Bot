  
const Discord = require('discord.js');
const colors = require('../../colors.json');

module.exports = {
    name: 'help misc',
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
                

            return message.channel.send(embed);
        }

    },
}