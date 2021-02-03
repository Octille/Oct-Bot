const { Client, Collection } = require("discord.js");
const { config } = require("dotenv");
const fs = require("fs");
const mongoose = require('mongoose');

const prefix = require('./models/prefix');

mongoose.connect('mongodb+srv://Octille:Gurkirat1@cluster0.vb6c8.mongodb.net/Data', 
{ 
 useNewUrlParser: true,
 useUnifiedTopology: true
});

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
            name: "me getting developed",
            type: "STREAMING"
        }
    }); 
});

client.on("message", async message => {
	client.on('message', async (message) => {

    if (message.author.bot) return;

    //Getting the data from the model
    const data = await prefix.findOne({
        GuildID: message.guild.id
    });

    const messageArray = message.content.split(' ');
    const cmd1 = messageArray[0];
    const args = messageArray.slice(1);

    //If there was a data, use the database prefix BUT if there is no data, use the default prefix which you have to set!
    if(data) {
        const prefix = data.Prefix;

        if (!message.content.startsWith(prefix)) return;
        const commandfile = client.commands.get(cmd1.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd1.slice(prefix.length)));
        commandfile.run(client, message, args);
    } else if (!data) {
        //set the default prefix here
        const prefix = "!";
        
        if (!message.content.startsWith(prefix)) return;
        const commandfile = client.commands.get(cmd1.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd1.slice(prefix.length)));
        commandfile.run(client, message, args);
    }
})

});

client.login(process.env.token);