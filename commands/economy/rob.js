const profileModel = require("../../models/profileSchema");
module.exports = {
    name: 'rob',
    description: '',
    async execute(message, args, cmd, client, Discord) {
        let profileData;
        profileData = await profileModel.findOne({ userID: message.author.id })
        const user = message.author;
        const mentioned = message.mentions.users.first().id;
        if(profileData.coins <1000){
            return message.channel.send(`${user} you need **₪ 1000** coins to rob someone`)
        }
        profileData = await profileModel.findOne({ userID: message.mentions.users.first().id })
        if(profileData < 100000){
            return message.channel.send('the person your trying to rob needs atleast **₪ 1000** coins in the wallet')
        }
        var d = Math.random();
if (d < 0.5)
{

      return message.channel.send(`not fail`)
}

    
else if (d < 0.7)
    {
        message.channel.send('fail')

    }
}

}