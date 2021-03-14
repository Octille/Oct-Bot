const profileModel = require("../../models/profileSchema");
const fs = require("fs");
module.exports = {
    name: 'inventory',
    description: '',
    aliases: ["inv"],
    async execute(message, args, cmd, client, Discord, profileData, settings) {
        let items = profileData.Items
        console.log(items)
        if(profileData.Items == null) {
            items = `looks like you dont have any items you can but some from \`${settings.prefix}shop\``
        }
        const FishingRod = profileData.Items.FishingRod
        const Cookies = profileData.Items.Cookies
        const inventory1 = new Discord.MessageEmbed()
        .setTitle(`Items Owned`)
        .setDescription(`${items}`)

            return message.channel.send(inventory1)
  

    }

}