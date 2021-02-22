const profileModel = require("../../models/profileSchema");
module.exports = {
    name: 'company',
    description: '',
    aliases: ["comp"],
    async execute(message, args, cmd, client, Discord, profileData) {
      const miners_owned = profileData.miners;
      let minercost;
      if (miners_owned < 3) {
        minercost = 100000;
      } else if (miners_owned < 7){
        minercost = 250000;
      } else if (miners_owned < 10){
        minercost = 500000;
      } else {
        minercost = 1000000;
      }

      if (!args.length) {
          const company = new Discord.MessageEmbed()
      .setAuthor(`${message.author.username}'s Company`, message.author.displayAvatarURL({ dynamic: true }))
      .addField(`⛏️ Miners:`, `${profileData.miners}`, true)
      .addField(`💵 Hourly(estimate)`, `₪ ${profileData.miners}`, true)
      .addField(`👷 Workers`, `${profileData.miners}`, true)
      .addField(`⚡ Bills`, `₪ ${profileData.miners}`)
      .setFooter('You can buy something from the shop by doing !company shop');

      return message.channel.send(company)

      }
      if(args[0] == "shop"){
        const shop1 = new Discord.MessageEmbed()
        .setColor("#6b32a8")
        .setTitle('Company Shop')
        .addField(`⛏️ Miners — ₪ ${minercost}`, `With miners you can make money by doing !mine`)
        .addField(`👷 Workers — coming soon`, `Workings increase your hourly pay for your company`)
        .addField(`coming soon . . . `, `coming soon`)
        .addField(`coming soon . . . `, `coming soon`)
        .addField(`coming soon . . . `, `coming soon`)
        .setFooter('Some prices might increase due to the amount of items you have')
        return message.channel.send(shop1)

      }


      if(args[0] == "buy"){
        if(!args[1]){
          return message.channel.send("please provide something to buy")
        }
        
        if(args[1] == "miner"){
          
    
          const amount = args[2]
          if(!args[2]){
              return message.channel.send('please provide how many minners you want to buy')
          }
          if(minercost > profileData.coins){
              return message.channel.send('You dont have enough to buy that');
          }
          

          await profileModel.findOneAndUpdate(
              {
                userID: message.author.id,
              },
              {
                $inc:{
                  coins: -minercost,
                  miners: amount,
                },
              }
            );
          return message.channel.send(`successfully bought **${amount}** miner(s) for **₪ ${minercost}**`)

      }

      }
    


    }

}