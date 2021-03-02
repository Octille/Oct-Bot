const profileModel = require("../../models/profileSchema");
module.exports = {
    name: 'inventory',
    description: '',
    aliases: ["inv"],
    async execute(message, args, cmd, client, Discord, profileData) {
        const FishingRod = profileData.Items.FishingRod
        const Cookies = profileData.Items.Cookies
        const inventory1 = new Discord.MessageEmbed()
        .setTitle(`Items Owned`)
        .addField(`<:FishingRod:816342491111882782>Fishing Rod - ${FishingRod.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`, `ID: \`FishingRod\``)
        .addField(`:cookie:Cookies - ${Cookies.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`, `ID: \`Cookies\``)

        if(!args[0]){
            return message.channel.send(inventory1)
        }

    }

}