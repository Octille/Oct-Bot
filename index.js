const { Collection } = require("discord.js");
const { default_prefix, config } = require('./config.json');
const fs = require("fs");
const Discord = require('discord.js');
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION" ]});
client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler =>{
  require(`./handlers/${handler}`)(client, Discord)
})



client.login(process.env.token);