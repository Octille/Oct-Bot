const ytdl = require('ytdl-core')
const ytSearch = require('yt-search')

const queue = new Map();

module.exports = {
  name: 'play',
  aliases: ['skip', 'stop'],
  description: 'Advanced music bot',
  run: async (client, message, args) => {

    const voice_channel = message.member.voice_channel;
    if (!voice_channel) return message.channel.send('You Need To Be In A Voice Channel To Use This Command!');
    const permissions = voice_channel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT')) return message.channel.send('You dont have permission to run this command!');
    if (!permissions.has('SPEAK')) return message.channel.send('You dont have permission to run this command!');

    const server_queue = queue.get(message.guild.id);

    if (cmd === 'play'){
      if(!args.length) return message.channel.channel('You need to send the 2nd argument!');
      let song = {};

      if (ytdl.validateURL(args[0])) {
        const song_info = await ytdl.getInfo(args[0]);
        song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url }
      } else {
        const video_finder = async (query) =>{
          const videoResults = await ytSearch(query);
          return (videoResults.videos.length > 1) ? videoResults.videos[0] : null;
        }

        const video = await video_finder(args.join(' '))
        if (video){
          song = { title : video.title, url: video.url }
        } else {
          message.channel.send('Error finding video')
        }
      }

      if (!server_queue){

        const queue_constructor = {
          voice_channel: voice_channel,
          text_channel: message.channel,
          connection: null,
          songs: []
        }
  
        queue.set(message.guild.id, queue_constructor);
        queue_constructor.songs.push(song);
  
        try{
          const connection = await voice_channel.join();
          queue_constructor.connection = connection;
          video_player(message.guild, queue_constructor.songs[0]);
        } catch (err) {
          queue.delete(message.guild.id);
          message.channel.send('There was an error connecting!')
          throw err;
        }
      } else{
        server_queue.songs.push(song);
        return message.channel.send(`👍 **${song.title}** added to queue!`);
      }
    }

   
  
    
  }
}

const video_player = async (guild, song) => {
  const song_queue = guild.get(guild.id);

  if(!song) {
    song_queue.voice_channel.leave();
    queue.delete(guild.id);
    return;
  }
  const stream = ytdl(song.url, { filter: 'audioonly' });
  song_queue.connection.play(stream, { seek: 0, volume: 0.5 })
  .on('finish', () => {
    song_queue.songs.shift()
    video_player(guild, song_queue.songs[0])
  });
  await song_queue.text_channel.send(`🎶 Now playing **${song.title}**`)
}