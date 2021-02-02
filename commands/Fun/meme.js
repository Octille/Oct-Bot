module.exports = {
    name: 'meme',
    description: "posts epic memes",
    execute(message, args){
        const got = require('got')
        const { MessageEmbed } = require('discord.js')
        
                const subreddits = ['dankmemes', 'me_irl']
        
                const index = Math.floor(Math.random() * subreddits.length)
        
                    got(`https://www.reddit.com/r/${subreddits[index]}/random/.json`).then(response => {
                    let content = JSON.parse(response.body)
                    let permaLink = content[0].data.children[0].data.permalink
                    let memeUrl = `https://reddit.com${permaLink}`;
                    let memeImage = content[0].data.children[0].data.url;
                    let memeTitle = content[0].data.children[0].data.title;
                    let memeUpvotes = content[0].data.children[0].data.ups;
                    let memeDownvotes = content[0].data.children[0].data.downs;
                    let memeNumComments = content[0].data.children[0].data.num_comments;
            
                    const memeEmbed = new MessageEmbed()
                    .setTitle(`${memeTitle}`)
                    .setURL(`${memeUrl}`)
                    .setImage(memeImage, ({
                        dynamic: true
                    }))
                    .setColor('RANDOM')
                    .setFooter(`👍${memeUpvotes} 👎${memeDownvotes} 💬${memeNumComments}`)
            
                    message.channel.send(memeEmbed)
            
                })
        
            }
    }
