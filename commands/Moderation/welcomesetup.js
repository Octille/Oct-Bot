const Guild = require('../../models/guild')
module.exports = {
    name: 'welcomesetup',
    description: '',
    aliases: [" "],
    async execute(message, args, cmd, client, Discord, profileData) {
        
        if (!message.member.hasPermission('MANAGE_GUILD')) {
            return message.channel.send('You do not have permission to use this command!').then(m => m.delete({timeout: 10000}));
        };

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
                    welcomeID: 0
                })

                newGuild.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));

                return message.channel.send('This server was not in our database! We have added it, please retype this command.').then(m => m.delete({timeout: 10000}));
            }
        });
        const idchannel = message.channel.id
        await settings.updateOne({
            welcomeID: idchannel
        });
        return message.channel.send(`your server welcome message has been setup id \`"#${idchannel}"\``)
    }

}