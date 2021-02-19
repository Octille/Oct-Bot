const discord = require("discord.js")

module.exports = {
    name: 'verifirole',
    description: "Sets up a verification message!",
    run: async (client, message, args) =>  {
        const channel = message.channel;
        let GuildRole = args[0]
        if(!GuildRole) return message.channel.send('Please provide a guild role(case sensitive)')
        let title = args[1]
        if(!title) return message.channel.send('please provide a title')
        let description = args.slice(2).join(" ")
        if(!description) return message.channel.send('please provide a description')
        const yellowTeamRole = message.guild.roles.cache.find(role => role.name === `${GuildRole}`);

 
        const yellowTeamEmoji = '✅';

 
        const embed = new discord.MessageEmbed()
            .setColor('#e42643')
            .setTitle(title)
            .setDescription(description)
 
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
        message.delete()
    }
 
}   