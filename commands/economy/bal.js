module.exports = {
    name: "balance",
    aliases: ["bal", "bl"],
    description: "Check the user balance",
    execute(message, args, cmd, client, Discord, profileData) {
      try {
        const Balance = new Discord.MessageEmbed()
        .setTitle('Bank')
        .setDescription(`Wallet: $${profileData.coins}\n Bank: $${profileData.bank}`)
        
          message.channel.send(Balance);
        } catch (err){
          message.channel.send('Bank created you get $1000 coins to start, to view you bank type "!bal"')
        }
      
    },
  };