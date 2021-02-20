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


fs.readdir(`./commands/${category}`, (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`../commands/${category}/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Loaded ${commandName}`);
    client.commands.set(commandName, props);
  });
});









mongoose.connect('mongodb+srv://Octille:Gurkirat1@discordbot.vb6c8.mongodb.net/OctDb?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(()=> console.log('connect'))
  .catch((error) => console.error(error));




client.login(process.env.token);