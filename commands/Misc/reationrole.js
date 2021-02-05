const discord = require('discord.js');
 
 module.exports = {
    name: 'ReationRole',
    description: "Sets up a reaction role message!",
    run: async (client, message, args) => {
        const channel = '786657488304341023';
        const yellowTeamRole = message.guild.roles.cache.find(role => role.name === "NONS");
 
        const yellowTeamEmoji = '✅';
 
        let embed = new Discord.MessageEmbed()
            .setColor('#e42643')
            .setTitle('Verification!')
            .setDescription('To Verifi react with the check mark emoji\n\n please read the rules befor verifing')

 
        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react(yellowTeamEmoji);

 
        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
 
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === yellowTeamEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(yellowTeamRole);
                }

            } else {
                return;
            }
 
        });
 
        client.on('messageReactionRemove', async (reaction, user) => {
 
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
 
 
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === yellowTeamEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(yellowTeamRole);
                }

            } else {
                return;
            }
        });
    }
}
 