const fs = require('fs');
const pagination = require('discord.js-pagination');
const discord = require('discord.js');
const client = new discord.Client(); 
const config = require('../../config.json');
module.exports = {
    name: 'help',
    description: 'send this message',
    run: async (client, message, args) => {
        const data = [];
		const { commands } = message.client;
        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
        var wait = ms => new Promise((r, j)=>setTimeout(r, ms))
        var fff;
        var hmu = {};
        fs.readdir("./commands", (err2, fff) => {
            for (i = 0; i < fff.length; i++) {
                hmu[i] = new discord.MessageEmbed();
                hmu[i].setTitle(fff[i]);
                hmu[i].setColor(config.embedColor);
                const iii = i;
                fs.readdir(`./commands/${fff[i]}/`, (err1, files1) => {
                    files1.forEach((f2, i2) => {
                        const cmd = f2.replace('.js', '');
                      hmu[iii].addField(cmd, `${command.description}`);
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
            console.log("+1")
            } else {
                f = 1;
            }
        }
        await wait(50);
        const emojis = ["◀", "▶"];
        
        pagination(message, helppage, emojis)
    }
}