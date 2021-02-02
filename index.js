const fs = require('fs');
const Discord = require('discord.js');
const fetch = require("node-fetch");
const { prefix, token } = require('./token.json');
const WOKCommands = require('wokcommands')

client.once('ready', () => {
	console.log('Ready!')

	new WOKCommands(client, 'commands')
})

const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]});
client.commands = new Discord.Collection();


client.login(process.env.token);