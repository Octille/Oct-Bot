const mongo = require('../mongo')
const commandPrefixSchema = require('../schemas/command-prefix-schema.js')



const { readdirSync } = require("fs");

const ascii = require("ascii-table");

let table = new ascii("Commands");
table.setHeading("Command", "Load status");

module.exports = (client) => {
    readdirSync("./commands/").forEach(dir => {
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));
    
        for (let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);
    
            if (pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow(file, '✅');
            } else {
                table.addRow(file, `❌  -> missing a help.name, or help.name is not a string.`);
                continue;
            }
    
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        }
    });
    
    console.log(table.toString());
}


module.exports.updateCache = (guildId, newPrefix) => {
    guildPrefixes[guildId] = newPrefix
  }
  
  module.exports.loadPrefixes = async (client) => {
    await mongo().then(async (mongoose) => {
      try {
        for (const guild of client.guilds.cache) {
          const guildId = guild[1].id
  
          const result = await commandPrefixSchema.findOne({ _id: guildId })
          guildPrefixes[guildId] = result.prefix
        }
  
        console.log(guildPrefixes)
      } finally {
        mongoose.connection.close()
      }
    })
  }