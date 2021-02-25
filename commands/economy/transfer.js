const profileModel = require("../../models/profileSchema");
module.exports = {
    name: 'transfer',
    description: '',
    aliases: ["share", "give"],
    async execute(message, args, cmd, client, Discord, profileData) {
        const user = message.author;
        const mentioned = message.mentions.users.first();
        const coins = profileData.coins
        if(!mentioned){
            return message.channel.send('please provide a person you want to transfer money to')
        }
        const amount = args[1]
        if(!args[1]) {
            return message.channel.send('please provide a amount to transfer')
        }
        if(isNaN(amount)){
            return message.channel.send('please provide valid amount')
        }
        if(amount > profileData.coins){
            return message.channel.send(`${user} you can\'t share to ${mentioned} you only have **₪ ${coins.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}** in your wallet`);
        }
        await profileModel.findOneAndUpdate(
            {
              userID: message.author.id,
            },
            {
              $inc : {
                coins: -amount,
              },
            }
          );
          await profileModel.findOneAndUpdate(
            {
              userID: message.mentions.users.first().id,
            },
            {
              $inc : {
                coins: amount,
              },
            }
          );
          return message.channel.send(`${user} you have successfully shared **₪ ${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}** to ${mentioned}`)

        


    }

}