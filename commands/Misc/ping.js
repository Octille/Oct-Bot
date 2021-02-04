module.exports = {
    name: 'ping',
    description: "this is a test command!",
    run: async (client, message, args) =>{
        message.channel.send('pong!');
    }
}