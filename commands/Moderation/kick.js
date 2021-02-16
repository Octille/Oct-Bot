const discord = require('discord.js')

module.exports = {
    name: 'kick',
    description: "This command kicks a member!",
    run: async (client, message, args) =>{
        if(!message.member.hasPermission("KICK_MEMBERS")){
             return message.channel.send('You Need Permistions To Run This Command!')
        }

        const user = message.mentions.users.first();
        if(!user) return message.channel.send('You need to mention a member!')
        let description = args.slice(1).join(" ") 
        if(!description) return message.channel.send('please specify a reason')
        if (!user.kickable) return message.channel.send(`I can't kick due to members role`)

        const embed = new discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle('Member Kicked')
        .setDescription("successfully kicked @" + user.username + "\nReason:" + description)

        if(user){
                const memberTarget = message.guild.members.cache.get(user.id);
                memberTarget.kick();
                message.channel.send(embed);
            }
          } 

        }
        
