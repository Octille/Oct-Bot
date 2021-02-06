const discord = require('discord.js')

module.exports = {
    name: 'kick',
    description: "This command kicks a member!",
    run: async (client, message, args) =>{
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.sned('You Need Permistions To Run This Command!')

        const user = message.mentions.users.first() || message.author;

        const embed = new discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle('Member Kicked')
        .setDescription("I have successfully kicked @" + user.username)


        const target = message.mentions.users.first();
        if(target){
            const memberTarget = message.guild.members.cache.get(target.id);
            memberTarget.kick();
            message.channel.send(embed);
        }else{
            message.channel.send(`you didnt menstion a member i can kick`);
        }
    }
}