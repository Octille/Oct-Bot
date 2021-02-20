module.exports =() =>{
    client.on("ready", async () => {
        var used1 = false;
        console.log(`Hi, ${client.user.username} is now online!`);
        setInterval(() => {
            if (used1) {
              client.user.setActivity("!help", {
                type: "LISTENING",
                status: "idle",
              });
              used1 = false;
            } else {
              client.user.setActivity("Me Getting Developed", {
                type: "STREAMING",
              });
              used1 = true;
            }
          }, 3000);
        });
}