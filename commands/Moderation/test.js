module.exports = {
    name: 'test',
    description: 'this is to test commands befor there open to the public',
    aliases: ["t"],
    async execute(message, args, cmd, client, Discord, profileData) {
        const dnas = message.channel.id
message.channel.send(dnas)

    }

}