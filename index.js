const { Collection } = require("discord.js");
const { default_prefix, config } = require('./config.json');
const fs = require("fs");
const Discord = require('discord.js');
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION" ]});
const mongoose = require('mongoose');


client.commands = new Discord.Collection();
client.events = new Discord.Collection();

client.config = config;
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      const event = require(`./events/${file}`);
      let eventName = file.split(".")[0];
      client.on(eventName, event.bind(null, client));
    });
  });


  const { Collection } = require("discord.js");
  bot.commands = new Collection();
  
  //We let the bot read through the 'commands' folder and return an array including all category folders
  const categories = fs.readdirSync('./commands/');
  
  for (const category of categories) {
  const commandFiles = fs.readdirSync(`./commands/${category}`).filter(File => File.endsWith('.js'));
  //We now enter every sub-folder one by one and filter the files to include .js only, readdirSync() returns an array including the items/files in that directory 
  
  //We create an intended for loop (notice how the for loops are inside eachother)
  for (const file of commandFiles) {
    const command = require(`../commands/${category}/${file}`);
    //We grab that command-file and it's values, and we push it into the commands collection
  
    bot.commands.set(command.name, command);
          }
      }








mongoose.connect('mongodb+srv://Octille:Gurkirat1@discordbot.vb6c8.mongodb.net/OctDb?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(()=> console.log('connect'))
  .catch((error) => console.error(error));




client.login(process.env.token);