const prefix = require("../../models/guild")
const Guild = require('../../models/guild');
module.exports = {
    name: 'help',
    description: 'send this message',
    async execute(message,args, cmd, client, Discord) {
        const settings = await Guild.findOne({
            guildID: message.guild.id
        }, (err, guild) => {
            if (err) console.error(err)
            if (!guild) {
                const newGuild = new Guild({
                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    guildName: message.guild.name,
                    prefix: process.env.PREFIX,
                    welcomeID: reqString,
        
                })
        
                newGuild.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));
        
                return message.channel.send('This server was not in our database! We have now added and you should be able to use bot commands.').then(m => m.delete({timeout: 10000}));
            }
        });
        
        
        

        const HELPEMBED = new Discord.MessageEmbed()
        .setTitle('Help')
        .setDescription(`For additional info on each command, type "${settings.prefix}help <command name>"`)
        .addField(`Moderation`, `\`!help Moderation\``, true)
        .addField(`Minecraft`, `\`!help Minecraft\``, true)
        .addField(`Fun`, `\`!help Fun\``, true)
        .addField(`Music`, `\`!help Music\``, true)
        .addField(`economy`, `\`!help Economy\``, true)
        .addField(`Misc`, `\`!help Misc\``, true)
        if(!args[0]) return await message.channel.send(HELPEMBED)


        let totalCategories = client.commands.map((cmd) => cmd.category)
        let Categories = totalCategories.filter((dub, index) => {
            return totalCategories.indexOf(dub) === index;
        });
        if(Categories.includes(args[0].toLowerCase())) {
            const CATAGORY_EMBED = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle(`${args[0].charAt(0).toUpperCase() * args[0].slice(1)} Commands`)
            .setDescription(
                `\`${client.commands
                .filter((cmd) => cmd.category === args[0])
                .map((cmd) => cmd.name)
                .join("`, `")}\``
                )
            .setFooter(`Dont forget to use "${process.env.prefix}" before every command`)
                return message.channel.send(CATAGORY_EMBED)
        }
        const COMMAND = client.commands.get(args[0]) || client.commands.find((a) => a.aliases && a.aliases.includes(args[0]));
        if (!COMMAND) return message.channel.send(`Incorrect command refer to ` + `\`${settings.prefix}help\``);

        if(!COMMAND.description.content){
            return message.channel.send('coding error please contact the owner `Gurkirat#9885`')
        }

        let aliases;
        if (COMMAND.aliases.length){
            aliases = COMMAND.aliases.join("` `");
        } else {
            aliases = "none";
        }

        const COMMAND_EMBED = new Discord.MessageEmbed()
        .setColor(RED)
        .setTitle(`\`${COMMAND.name} command\``)
        .addField(`Description`, COMMAND.description.content)
        .addField(`Aliases`, `\`${aliases}\``)


    }
}