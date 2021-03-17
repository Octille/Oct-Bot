const { Collection } = require("discord.js");
const { default_prefix, config } = require('./config.json');
const fs = require("fs");
const Discord = require('discord.js');
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION" ]});
const mongoose = require('mongoose');
require('dotenv').config();


client.on("ready", () => {
  client.user.setStatus('online')
  client.user.setPresence({
      game: {
          name: '!help',
          type: "Playing",
          url: "https://bit.ly/38OiD4C"
      }
  });
});


client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler =>{
  require(`./handlers/${handler}`)(client, Discord)
})

mongoose.connect(process.env.MONGODB_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(()=> console.log('Connected to MongoDB!'))
  .catch((error) => console.error(error));


client.login(process.env.token);
