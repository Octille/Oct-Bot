module.exports = {
    name: 'ping',
    description: "this is a ping cmd",
execute(message, args, Discord, client){
             const embed = new Discord.MessageEmbed()
            .setTitle('Bots ping')
            .setColor('RANDOM')
            .setDescription(`🏓 | Latency is ${Date.now() - message.createdTimestamp}ms. \n 📚 | API Latency is ${Math.round(client.ws.ping)}ms`); 

        message.channel.send(embed)              
    }
    }