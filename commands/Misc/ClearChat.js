const discord = require("discord.js");

module.exports = {
    name: 'clear',
    description: "Clear messages!",
    run: async (client, message, args) => {
        if (!args[0]) return message.reply("Please enter the amount of messages to clear!");

        if(isNaN(args[0])) return message.reply("Please type a real number!");

        if(args[0] > 100) return message.reply("You can't remove more than 100 messages!");
        
        if(args[0] < 1) return message.reply("You have to delete at least one message!!");

        await message.channel.messages.fetch({ limit: args[0]}).then(messages =>{
            message.channel.bulkDelete(messages)
            
            const embed = new discord.MessageEmbed()
            .setTitle(`Cleared messaged`)
            .setDescription('successfully deleted ${meesage.size} messages')
            .setColor("RANDOM")
            
            message.channel.send(embed);
    });

 }
}  