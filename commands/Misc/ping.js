module.exports = {
    name: 'ping',
    description: "this is a test command!",
    run(message, args){
        message.channel.send('pong!');
    }
}