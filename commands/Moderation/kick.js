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
        if (!user.kickable) return message.channel.send(`Sorry but i can kick someone with higher roles then me`)
        let description = args.slice(1).join(" ") 
        if(!description) return message.channel.send('please specify a reason')
        
        const embed = new discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle('Member Kicked')
        .setDescription(`successfully kicked ${user}`+ "\nReason:" + description)

        if(user){
                const memberTarget = message.guild.members.cache.get(user.id);
                memberTarget.kick();
                message.channel.send(embed);
            }
          } 

        }
        
