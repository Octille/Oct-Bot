const fs = require('fs');
const pagination = require('discord.js-pagination');
const discord = require('discord.js');
const client = new discord.Client(); 
const config = require('../../config.json');
module.exports = {
    name: 'help',
    description: 'send this message',
    async execute(client, message, args, Discord){
        var wait = ms => new Promise((r, j)=>setTimeout(r, ms))
        var fff;
        var hmu = {};
        fs.readdir("./commands", (err2, fff) => {
            for (i = 0; i < fff.length; i++) {
                hmu[i] = new discord.MessageEmbed();
                hmu[i].setTitle('`Type !h "(command name)" for more info\n`' + `___${fff[i]}___`);
                hmu[i].setColor("RANDOM");
                const iii = i;
                fs.readdir(`./commands/${fff[i]}/`, (err1, files1) => {
                    files1.forEach((f2, i2) => {
                        const cmd = f2.replace('.js', '');
                      hmu[iii].addField(cmd, '_ _');
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
}