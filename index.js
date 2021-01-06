const fs = require('fs');
const Discord = require('discord.js');
const fetch = require("node-fetch");


const { prefix, } = require('./config.json');

const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]});
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
});

client.once('reconnecting', () => {
	console.log('Reconnecting!');
});

client.once('disconnect', () => {
	console.log('Disconnect!');
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args, Discord, client);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}

});

client.on('message', message => {
	if (!message.guild) return;
	if (message.content.startsWith('!kick')) {

	  if (user) {
		const member = message.guild.member(user);  
		if (message.member.hasPermission('KICK_MEMBERS')) {
			
		  member
			.kick('Optional reason that will display in the audit logs')
			.then(() => {
			  message.reply(`Successfully kicked ${user.tag}`);
			})
			.catch(err => {
			  message.reply('I was unable to kick the member');
			  console.error(err);
			});
		} else {
		  message.reply("That user isn't in this guild!");
		}
	  } else {
		message.reply("You didn't mention the user to kick!");
	  }
	}
  });


client.login(process.env.token);