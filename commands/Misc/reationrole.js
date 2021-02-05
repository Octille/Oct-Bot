const discord = require('discord.js');
 
 module.exports = {
    name: 'Verifi',
    description: "Sets up a reaction role message!",
    run: async (client, message, args) => {
    message.delete()
    const yellowTeamEmoji = '✅';



    const embed = new discord.MessageEmbed()
    .setTitle("Verification")
    .setDescription("React to the check mark emoji to verifi \n \n please read the rules befor verifing")
    message.channel.send(embed)
    
    let messageEmbed = await message.channel.send(embed);
    messageEmbed.react(yellowTeamEmoji);

}
 }