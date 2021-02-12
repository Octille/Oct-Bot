const discord = require('discord.js')

module.exports = {
    name: 'kick',
    description: "This command kicks a member!",
    permissions: ["ADMINISTRATOR"],
    run: async (client, message, args) =>{

        const user = message.mentions.users.first() || message.author;

        const embed = new discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle('Member Kicked')
        .setDescription("I have successfully kicked @" + user.username)


        const target = message.mentions.users.first();
        try{
            if(target){
                const memberTarget = message.guild.members.cache.get(target.id);
                memberTarget.kick();
                message.channel.send(embed);
            }
          } catch(err) {
            message.delete()
            message.channel.send('You didnt @ a memeber i can kick')

        }
        }
    }
