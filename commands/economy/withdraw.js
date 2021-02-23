const profileModel = require("../../models/profileSchema");
module.exports = {
    name: 'withdraw',
    description: 'withdraws your coins',
    aliases: ["with"],
    async execute(message, args, cmd, client, Discord, profileData) {
        const amount = args[0];
        if(args[0] == "all"){
            const all = profileData.bank
            if(all < 1){
                return message.channel.send('you can\'t withdraw any coins you have 0 in your bank')
            }
            await profileModel.findOneAndUpdate(
                {
                  userID: message.author.id,
                },
                {
                    $inc: {
                      coins: all,
                      bank: -all,
                    },
                  }
                );
                return message.channel.send(`Succesfully withdrew **₪ ${all.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}**, your bank is now **₪ ${profileData.coins.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}**`)
        }
        if (isNaN(amount)) {
            return message.channel.send('please provide a valid amount')
             }
             if(amount> profileData.bank){
                return message.channel.send('You dont have that many coins in your bank!');
            }
             await profileModel.findOneAndUpdate(
                {
                  userID: message.author.id,
                },
                {
                    $inc: {
                      coins: amount,
                      bank: -amount,
                    },
                  }
                );
                return message.channel.send(`Succesfully withdrew ₪${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}, your bank is now ₪${profileData.coins.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`)


    }

}