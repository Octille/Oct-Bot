const profileModel = require("../../models/profileSchema");
const cooldowns = new Map();
const Guild = require('../../models/guild');
const mongoose = require('mongoose');

module.exports = async(Discord, client, message) => {
  if(message.author.id == ""){
    return message.channel.send('sorry but it looks like you were temporarily banned from using OCT')
  }
  const messages = ["Hello", "Hey", "Hi", "Goodday"]

  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  if(message.content.includes('hello')) {
    message.reply(randomMessage);
  }

if(message.content.includes('bye')) {
  message.reply('Sorry to see you go D:');
} 
  const settings = await Guild.findOne({
    guildID: message.guild.id
}, (err, guild) => {
    if (err) console.error(err)
    if (!guild) {
        const newGuild = new Guild({
            _id: mongoose.Types.ObjectId(),
            guildID: message.guild.id,
            guildName: message.guild.name,
            prefix: process.env.PREFIX,

        })

        newGuild.save()
        .then(result => console.log(result))
        .catch(err => console.error(err));

        return message.channel.send('This server was not in our database! We have now added and you should be able to use bot commands.').then(m => m.delete({timeout: 10000}));
    }
});


    const prefix = settings.prefix;
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    let profileData;
  try {
    profileData = await profileModel.findOne({ userID: message.author.id });
    if (!profileData) {
      let profile = await profileModel.create({
        userID: message.author.id,
        serverID: message.guild.id,
        coins: 1000,
        bank: 0,
        Company: {
           miners: 0,
           workers: 0 
          },
          Items: {
          placeholder: 0,
        }
    
          
          
        
      });
      profile.save();
    }
  } catch (err) {
    console.log(err);
  }
  if(profileData.coins < 0){
    message.channel.send('looks like you lost all your coins and has a stroke, you paid the hostpital half your bank')
    const bank = profileData.bank
     
    let half = bank * 0.5;
    if(bank < 2){
      half = 0;
    }
    await profileModel.findOneAndUpdate(
      {
        userID: message.author.id,
      },
      {
        $inc: {
        bank: -half,
      },
    },
    );
    await profileModel.findOneAndUpdate(
      {
        userID: message.author.id,
      },
      {
          $set: {
            coins: 0,
          },
        },
      
      );
      return;
  }
    
    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

    try {if(!cooldowns.has(command.name)){
        cooldowns.set(command.name, new Discord.Collection());
    }
    const current_time = Date.now();
    const time_stamps = cooldowns.get(command.name);
    const cooldown_amount = (command.cooldown) * 1000;

    if(time_stamps.has(message.author.id)){
        const expiration_time = time_stamps.get(message.author.id) + cooldown_amount;

        if(current_time < expiration_time){
            const time_left = (expiration_time - current_time) / 1000 ;

            return message.reply(`Please wait \`${time_left.toFixed(1)}\` more sec before using ${command.name}`);
        }
    }
  
    time_stamps.set(message.author.id, current_time);
    setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);
  } catch (err) {
    return message.channel.send('there was no command found please refer to !help')}
 


    if(command) command.execute(message, args, cmd, client, Discord, profileData);

    
 
   
}