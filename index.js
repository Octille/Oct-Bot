const { Client, Collection } = require("discord.js");
const { config } = require("dotenv");
const fs = require("fs");
const mongoose = require('mongoose');
const prefix = require('discord-prefix');


let defaultPrefix = '!';

const client = new Client({
    disableEveryone: true
});

client.commands = new Collection();
client.aliases = new Collection();

client.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on("ready", () => {
    console.log(`Hi, ${client.user.username} is now online!`);

    client.user.setPresence({
        status: "online",
        game: {
            name: "!help",
            type: "Listening"
        }
    }); 
});

client.on("message", async message => {
       //get the prefix for the discord server
	let guildPrefix = prefix.getPrefix(message.guild.id);

	   //set prefix to the default prefix if there isn't one
	if (!guildPrefix) guildPrefix = defaultPrefix;

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(guildPrefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(guildPrefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) 
        command.run(client, message, args);
});



client.login(process.env.token);