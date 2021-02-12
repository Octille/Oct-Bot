const discord = require('discord.js')

module.exports = {
    name: 'Welcome',
    Description: 'type !welcome (welcome channel id) (Rules channel id)',
    run: async (client, message, args) => {
        let title = args[0] 
        let color = args[1] 
        const channelId = '719800187404681257' // welcome channel
        const targetChannelId = '719799889973739560' // rules and info
        
        const embed = new discord.messageembed()
        .setTitle(`welcome: + `<@${member.id}>`)
      
    
      }

    }
