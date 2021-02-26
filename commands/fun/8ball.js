module.exports ={
    name:'8ball',
    async execute(message,args, cmd, client, Discord){
        if(!args[0]){
            return message.channel.send('please provid a question')
        } //The 8ball Message
        const rand = ['Yes', 'No', 'Why are you even trying?', 'What do you think? NO', 'Maybe', 'Never', 'Yep'];

        const ball = rand[Math.floor(Math.random()*rand.length)];
        return message.channel.send(ball)
    }
}