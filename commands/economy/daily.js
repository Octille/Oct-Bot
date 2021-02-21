const profileModel = require("../../models/profileSchema");
module.exports = {
    name: 'daily',
    cooldown: 60 * 60 * 24,
    async execute(message, args, cmd, client, discord, profileData) {
        const daily = 250
        const response = await profileModel.findOneAndUpdate(
            {
              userID: message.author.id,
            },
            {
                $inc: {
                  coins: daily,
                },
              }
            );
            return message.channel.send(`$${daily} were placed in your wallet`)

    }
}