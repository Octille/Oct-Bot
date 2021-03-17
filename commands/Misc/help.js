const fs = require('fs');
const pagination = require('discord.js-pagination');
const discord = require('discord.js');
const client = new discord.Client(); 
const { readdirSync } = require("fs");

module.exports = {
    name: 'help',
    description: 'send this message',
    async execute(message, args, cmd, client, Discord, profileData, settings) {
        if(!args.length){
        var wait = ms => new Promise((r, j)=>setTimeout(r, ms))
        var fff;
        var hmu = {};
        fs.readdir("./commands/", (err2, fff) => {
            for (i = 0; i < fff.length; i++) {
                hmu[i] = new discord.MessageEmbed();
                hmu[i].setTitle(`__${fff[i]}__`);
                hmu[i].setColor("RED");
                const iii = i;
                fs.readdir(`./commands/${fff[i]}/`, (err1, files1, dir) => {
                    const { commands } = message.client;
                    const command = (commands.map(command => command.name).join(', '));
                    files1.forEach((f2, i2) => {
                        const cmd = f2.replace('.js', ``);
                      hmu[iii].addField(cmd, `\`${settings.prefix}help ${cmd}\``);
                    });
                });
            }  
        });
        await wait(50);
        var helppage = [];
        var f = 0;
        for (let step = 0; f == 0; step++) {
            if(hmu[helppage.length]) {
            helppage[helppage.length] = hmu[helppage.length];
            } else {
                f = 1;
            }
        }
        await wait(50);
        const emojis = ["◀", "▶"];
        
        pagination(message, helppage, emojis)
    }
        const data = [];
		const { commands } = message.client;
        const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('that\'s not a valid command!');
		}

		data.push(`**Name:** ${command.name}`);

		if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Description:** ${command.description}`);
		if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

		data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

		message.channel.send(data, { split: true });
    }
    

    
}