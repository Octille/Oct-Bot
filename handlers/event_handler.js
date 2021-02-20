const fs = require('fs');
const Discord = require('discord.js')

module.exports = (client, discord) =>{
    const load_dir = (dirs) =>{
    const event_files = fs.readdirSync(`./event/${dirs}`).filter(file => file.endsWith('.js'));
    for(const file of event_files){
        const event = require(`../event/${dirs}/${file}`);
        const event_name = file.split('.')[0];
        client.on(event_name, event.bind(null, Discord, client));
    }
}

['client', 'guild'].forEach(e => load_dir(e));
}