module.exports = {
    name: 'ping',
    description: "this is a test command!",
    execute(message, args){
        message.channel.send('pong!');
    }
}