 module.exports = {
    name: 'reactionrole',
    description: "Sets up a reaction role message!",
    run: async (client, message, args) => {
        if(message.member.roles.cache.has('627526794463150100')){
            message.delete()
            const channel = '786657488304341023';
            const Nons = message.guild.roles.cache.find(role => role.name === "Nons");
     
            const VerifiEmoji = '✅';
           
            let embed = new Discord.MessageEmbed()
                .setColor('#e42643')
                .setTitle('Verification!')
                .setDescription('To get access the server please verfi!\n\n'
                 + `*To verifi react with check mark emoji* ${VerifiEmoji}`);
     
            let messageEmbed = await message.channel.send(embed);
            messageEmbed.react(VerifiEmoji);
    
            client.on('messageReactionAdd', async (reaction, user) => {
                if (reaction.message.partial) await reaction.message.fetch();
                if (reaction.partial) await reaction.fetch();
                if (user.bot) return;
                if (!reaction.message.guild) return;
     
                if (reaction.message.channel.id == channel) {
                    if (reaction.emoji.name === VerifiEmoji) {
                        await reaction.message.guild.members.cache.get(user.id).roles.add(Nons);
                    }
                } else {
                    return;
                }
     
            });

        } else {
            message.channel.send('You don\'t have permissions for this command')
        }
    }
}