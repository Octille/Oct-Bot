const profileModel = require("../../models/profileSchema");
const Canvas = require('canvas');
const path = require('path');
const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');
	let fontSize = 70;

	do {
		ctx.font = `${fontSize -= 10}px sans-serif`;
	} while (ctx.measureText(text).width > canvas.width - 300);

	return ctx.font;
};
const Discord = require('discord.js');
const Guild = require('../../models/guild')

module.exports = async (client, discord, member,) => {
	try{
		let profile = await profileModel.findOne({

		})

	} catch(err){
		let profile = await profileModel.create({
			userID: member.id,
			serverID: member.guild.id,
			coins: 1000,
			bank: 0,
			miners: 0,
		  });
		  profile.save();
	}
	
	const settings = await Guild.findOne({
		guildID: member.guild.id

	}, (err, guild) => {
		if (err) console.error(err)
		if (!guild) {
			const newGuild = new Guild({
				_id: mongoose.Types.ObjectId(),
				guildID: message.guild.id,
				guildName: message.guild.name,
				prefix: process.env.PREFIX,
			})
	
			newGuild.save()
			.then(result => console.log(result))
			.catch(err => console.error(err));
		}
	});

	
	const Welcome = settings.welcomeID
	if(Welcome < 0) return;
    const channel = member.guild.channels.cache.get(`${Welcome}`);
	if (!channel) return;

	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage(path.join(__dirname, '../../wallpaper.jpg'));
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	ctx.font = '28px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText('Welcome to the server,', canvas.width / 2.5, canvas.height / 3.5);

	ctx.font = applyText(canvas, `${member.displayName}!`);
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

	channel.send(attachment);




 
};

