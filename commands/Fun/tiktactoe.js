const { tictactoe } = require('reconlx')

module.exports = {
    name : 'tictactoe',
    aliases: ['ttt'],
    async execute(client, message, args, Discord){
        const member = message.mentions.members.first() 
            if(!member)  return  message.channel.send('Please specify a member')
        
        new tictactoe({
            player_two: member, 
            message: message
        })
    }
}