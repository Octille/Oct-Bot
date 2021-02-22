const chooseArr = ["2", "1",];
const profileModel = require("../../models/profileSchema");
module.exports = {
  name: "beg",
  description: "beg for coins",
  async execute(message, args, cmd, client, discord, profileData) {
    const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];
  

    const randomNumber = Math.floor(Math.random() * 500) + 1;
    const response = await profileModel.findOneAndUpdate(
      {
        userID: message.author.id,
      },
      {
        $inc: {
          coins: randomNumber,
        },
      }
    );
    const messages = [`Charli D'Amelio threw **₪${randomNumber}** at you whilst dancing!`, `Ben Simmons shot a 3! Earning you **₪${randomNumber}**!`, `Your mom just donated **₪${randomNumber}** to the aids society which landed in your hands.`, `Steven Hawking just sent down **₪${randomNumber}** from heaven!`, `You decided that black lives matter and was donated **₪${randomNumber}**.`, `Gurkirat (developer) sent you **₪${randomNumber}**!`, `Someone *finally* liked your tiktok earning you **₪${randomNumber}**!`, `A fan blew **₪${randomNumber}** at you.`, `Your friend lent you **₪${randomNumber}**. Remember to return it.`, `Bella Poarch liked your tiktok and earned you fame! **₪${randomNumber}** was earned!`, `You woke up and it was time to go to school. Your alarm clock exploded releasing **₪${randomNumber}**.`]
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    return message.channel.send(randomMessage);
  },
};

