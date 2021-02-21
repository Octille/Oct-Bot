module.exports = {
    name: "balance",
    aliases: ["bal", "bl"],
    description: "Check the user balance",
    execute(message, args, cmd, client, Discord, profileData) {
        const Balance = new Discord.MessageEmbed()
        .setTitle('Bank')
        .setDescription(`Wallet: $${profileData.coins}\n Bank: $${profileData.bank}`)
      message.channel.send(Balance);
    },
  };