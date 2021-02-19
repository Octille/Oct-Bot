const { Collection } = require("discord.js");
const { default_prefix, config } = require('./config.json');
const fs = require("fs");
const Discord = require('discord.js');
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION" ]});
const mongoose = require("mongoose");
const MONGODB_SRV = 'mongodb+srv://Octille:Gurkirat1@discordbot.vb6c8.mongodb.net/OctDB?retryWrites=true&w=majority';



const db = require("quick.db") 




client.commands = new Collection();
client.aliases = new Collection();

client.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

var used1 = false;

client.on("ready", () => {
    console.log(`Hi, ${client.user.username} is now online!`);
    setInterval(() => {
        if (used1) {
          client.user.setActivity("!help", {
            type: "LISTENING",
            status: "idle",
          });
          used1 = false;
        } else {
          client.user.setActivity("Me Getting Developed", {
            type: "STREAMING",
          });
          used1 = true;
        }
      }, 3000);
});

client.on("message", async message => {

  let prefix = db.get(`prefix_${message.guild.id}`)
  if(prefix === null) prefix = default_prefix;

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd= args.shift().toLowerCase();
   
  

      if (cmd.length === 0) return;
    
      let command = client.commands.get(cmd) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmd));
      if (!command) command = client.commands.get(client.aliases.get(cmd));
  
      if (command) 
          command.run(client, message, args, cmd);


});


client.login(process.env.token);