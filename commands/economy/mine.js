const profileModel = require("../../models/profileSchema");
module.exports = {
    name: 'mine',
    description: 'mines some coins',
    cooldown: 60 * 30,
    async execute(message, args, cmd, client, Discord, profileData) {
        if(!profileData.miners) return message.channel.send('looks like you dont have a minner go to the shop and buy one!')
        const recieved = profileData.miners * 25000
        await profileModel.findOneAndUpdate(
            {
              userID: message.author.id,
            },
            {
              $inc : {
                coins: recieved,
              },
            }
          );
          return message.channel.send(`**${message.author.username}** has ran their miners and gotten** ₪ ${recieved}**`)

}
}