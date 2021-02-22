module.exports = {
    name: 'test',
    description: 'this is to test commands befor there open to the public',
    aliases: ["t"],
    async execute(message, args, cmd, client, Discord, profileData) {
        const messages = ["Message1", "Message2", "Message3", "Message4"]

const randomMessage = messages[Math.floor(Math.random() * messages.length)];
message.channel.send(randomMessage)

    }

}