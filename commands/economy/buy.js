const profileModel = require("../../models/profileSchema");
module.exports = {
    name: 'buy',
    description: '',
    async execute(message, args, cmd, client, Discord, profileData) {

        if(args[0] == "miner"){
            const miners_owned = profileData.miners;
            let miner_costs;
            if (miners_owned < 3){
                miner_costs = 100000
            } else if (miners_owned < 3) {
                miner_costs = 150000
            } else if (miners_owned < 10) {
                miner_costs = 2500000
            }

            const amount = args[1]
            if(!args[1]){
                return message.channel.send('please provide how many minners you want to buy')
            }
        
            const paying = miner_costs 
            if(paying > profileData.coins){
                return message.channel.send('You dont have enough to buy that');
            }
            

            await profileModel.findOneAndUpdate(
                {
                  userID: message.author.id,
                },
                {
                  $inc: {
                    coins: -paying,
                    miners: amount
                  },
                }
              )
            return message.channel.send(`successfully bought ${amount} miner(s) for $${paying}`)

        }

    }

}