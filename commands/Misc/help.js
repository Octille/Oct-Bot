module.exports.run = async (bot, message, args) => {
    function getMenu() {
     var hpmenu = {};
     return new Promise(function(resolve, reject) {
      dashboard.readServerBoundValue(
       `${message.guild.id}`,
       'PREFIX',
       async function(output) {
        if (output) {
         var prefixxx = output;
        } else {
         var prefixxx = config.botPrefix;
        }
        //=====================================================================================================
        fs.readdir('./src/commands/', (err2, files2) => {
         files2.forEach((f2, i2) => {
          hpmenu[f2] = new discord.MessageEmbed();
          hpmenu[f2].setTitle(`${f2}`);
          console.log('Added catagory ' + f2);
          //=========================================================================================
          fs.readdir(`./src/commands/${f2}`, (err, files) => {
           files.forEach((f, i) => {
            const cmd = f.replace('.js', '');
            hpmenu[f2].addField(cmd, 'test');
            console.log('Added command ' + cmd);
            //=====================================================================================================
           });
           resolve(hpmenu);
          });
         });
        });
       }
      );
     });
    }
   
    async function main() {
     var output = await getMenu();
     message.channel.send(output['developer']);
    }
    main();
   };