const { Client, Collection } = require("discord.js");
const { config } = require("dotenv");
const fs = require("fs");
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const MongoDBProvider = require('commando-provider-mongo').MongoDBProvider;
const Commando = require('discord.js-commando')

const client1 = new Commando.CommandoClient({
	owner: '251120969320497152',
	commandPrefix: config.prefix,
  })
  
  client1.setProvider(
	MongoClient.connect(config.mongoPath)
	  .then((client) => {
		return new MongoDBProvider(client, 'Oct Bot')
	  })
	  .catch((err) => {
		console.error(err)
	  })
  )




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

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) 
        command.run(client, message, args);
});



client.login(process.env.token);