const { Collection } = require("discord.js");
const { default_prefix, config } = require('./config.json');
const fs = require("fs");
const Discord = require('discord.js');
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION" ]});
const mongoose = require('mongoose');


client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler =>{
  require(`./handlers/${handler}`)(client, Discord)
})

mongoose.connect('mongodb+srv://Octille:Gurkirat1@discordbot.vb6c8.mongodb.net/OctDb?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(()=> console.log('Connected to MongoDB!'))
  .catch((error) => console.error(error));


//client.login(process.env.token);
client.login('NzQxNzc2NDczNjEzOTI2NDkw.Xy8fLA.j-TZvjyhOdWKl_2vZxl7EksbZ6M')