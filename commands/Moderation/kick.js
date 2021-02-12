const discord = require('discord.js')

module.exports = {
    name: 'kick',
    description: "This command kicks a member!",
    run: async (client, message, args) =>{
        if(!message.member.hasPermission("KICK_MEMBERS")){
             return message.channel.send('You Need Permistions To Run This Command!')
        }

        const user = message.mentions.users.first() || message.author;
        if(!user) return message.channel.send('You need to mention a member!')
        let description = args.slice(1).join(" ") 
        if(!description) return message.channel.send('please specify a reason')

        const embed = new discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle('Member Kicked')
        .setDescription("successfully kicked @" + user.username + "\nReason:" + description)


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
