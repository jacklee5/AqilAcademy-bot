const Discord = require("discord.js");
const client = new Discord.Client({ autoReconnect: true });
const prefix = "."


client.on('ready', () => {
    client.user.setStatus('online');
    client.user.setPresence({ game: { name: 'battleforthenet.com', type: 0 } });
    console.log(`Logged in as ${client.user.tag}!`);
});

function clean(text) {
    if (typeof(text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}

  function removePunctuation(str) {
      var m = '!@#$%^&*()_+-=~`.,></?"\':;}{[]\\☺☻';
      var r = '';
      for(var i = 0; i < str.length; i++){
          if (m.indexOf(str[i]) === -1) {
              r += str[i];
          }
      }
       return r;
   }
function contains(a, b) {
    if(a === b) return true;
};


var badWords = "fuck,shit,wtf,cock,dick,sex,porn,fucker,mother fucker,bitch,asshole,tit,vagina,pussy,ass".split(",");


client.on('message', msg => {

    for (var a = 0; a < msg.content.length; a++) {
  for (var i = 0; i < badWords.length; i++) {
      let splitted = removePunctuation(msg.content.toLowerCase()).split(" ")
      if (contains(splitted[a], badWords[i].toLowerCase())) {
          if(msg.author.id === client.user.id) return;
          msg.delete();
            msg.reply("Please control your language! <:stop:364887308782272512>");
            let member = msg.author;
            member.send("**You've been warned in AqilAcademy:**\nPlease do not use words that go against the language filter. Thank you!\n\n_If you believe this word was filtered in error, please contact <@299150484218970113>._");
            client.channels.get("382499510401630209").send({
                embed: {
                    color: 16753920,
                    fields: [{
                        name: "<:blobpolice:364194401783775252> Member Warned",
                        value: "Member: " + msg.author.username + "#" + msg.author.discriminator + "\nMember ID: " + msg.author.id + "\nModerator: Clyde#5067" + "\nWarning: Please do not use words that go against the language filter. Thank you!"
                    }],

                }
            })
            client.channels.get("373559262095343616").send("!!infract " + msg.author.id)
            client.channels.get("382937336876367872").send("**Filtered Message:** " + msg.content + "\n**Word:** " + splitted[a] + " for badWords `" + badWords[i] + "`")
      }
  }
}
    
    
var said = msg.content.toLowerCase(); //declare said
    
    if (msg.content.startsWith(prefix + "eval")) {
        if (msg.author.id !== "299150484218970113") return msg.reply("`ERROR`\nIncorrect Permissions");
        let args = msg.content.split(" ").slice(1);

        try {
            const code = args.join(" ");
            let evaled = eval(code);

            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);

            msg.channel.send(clean(evaled), { code: "xl" });
        } catch (err) {
            msg.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
        return;
    }
    
    if (msg.author.bot && !client.user) return;
    
    
    if (said.startsWith(prefix + "speak")) { //Shadow Only
        var toSpeak = msg.content.slice(prefix.length + 6, msg.length);
        if (msg.author.id === "299150484218970113" || msg.author.id === "316313763513106434") {
            msg.delete()
            if (msg.author.id === "299150484218970113") {
                msg.channel.send(toSpeak)
            } else {
                msg.channel.send(toSpeak + "\nSpoken by " + msg.author.username)
            }
            
        } else {
            msg.delete();
            msg.reply("<:clydeWarnRed:358724931107684362> You do not have the correct permissions to use this command.").then(msg => msg.delete(3000));
            return;
        }
        return;
    }
    if(msg.content.startsWith(prefix + "give") || msg.content.startsWith(prefix + "stats") || msg.content.startsWith(prefix + "showmystats") || msg.content.startsWith(prefix + "lookup") || msg.content.startsWith(prefix + "resetstats")) return;
        if (msg.content.startsWith(prefix) && msg.content.slice("").splice(1) !== ".") {
            let embed = new Discord.RichEmbed()
            embed.setTitle("This Bot Has Been Blocked By Your ISP")
            embed.setDescription("Well, not yet. But the FCC is about to vote to get rid of the net neutrality, letting ISP's censor and throttle websites, and charge extra fees. Congress can stop them, but they need to hear from internet users like you right now, before the vote on Thursday. [Learn more.](https://www.battleforthenet.com/#widget-learn-more)")
            embed.setColor(16711680)
            msg.reply({ embed })
        }
    if(msg.content.startsWith("!!kick") && msg.channel.id === "373559262095343616") {
        let userID = said.slice(prefix.length + 6, msg.length);
        let aqilacademy = client.guilds.get("294115797326888961")
        let member = aqilacademy.members.get(userID)
        if(!member.kickable) return member.send(":tired_face: I can't kick you from AqilAcademy! But I'm just letting you know that you have three or more infractions and should STOP doing stuff that gives you infractions. Kthxbai");
        member.kick("Auto Kick for 3 Infractions")
        if(client.channels.get("382499510401630209")) {
        client.channels.get("382499510401630209").send({
                            embed: {
                                color: 16711680,
                                fields: [{
                                    name: "<:blobpolice:364194401783775252> Member Kicked",
                                    value: "Member: " + member.user.username + "#" + member.user.discriminator + "\nMember ID: " + member.user.id + "\nModerator: Clyde#5067\nReason: Auto Kick for 3 Infractions"
                                }],

                            }
                        })
        }
    }
})
    
client.on('guildMemberAdd', member => {
    if(member.guild.id !== "294115797326888961") return;
    let regUser = client.guilds.get("294115797326888961").roles.find("name", "Regular Person")
    let pings = client.guilds.get("294115797326888961").roles.find("name", "Pings")
    member.addRole(regUser.id)
    member.addRole(pings.id)
    client.channels.get("294115797326888961").send("<@" + member.id + "> Welcome! <:blobwave:364865411344236545>")
    member.send({
        embed: {
            //color: 16711680,
            fields: [{
                name: "<:blobwave:364865411344236545> Welcome to AqilAcademy!",
                value: "This is a server created by Aqil#4788.\nYou're going to want to check out <#325380886394568704> for more information about this server and what the rules are.\n\nHave a great time on AqilAcademy!"
            }],

        }
    })
    client.channels.get("382499510401630209").send({
        embed: {
            color: 65280,
            fields: [{
                name: "<:blobwave:364865411344236545> Member Joined",
                value: "Member: " + member.user.username + "#" + member.user.discriminator + "\nMember ID: " + member.user.id
            }],

        }
    })

});
client.on('guildMemberRemove', member => {
    if(member.guild.id !== "294115797326888961") return;
    client.channels.get("294115797326888961").send(member.user.tag + " has left the server. <:blobsob:364864813161119764>")
    member.send("We're sorry to see you leave AqilAcademy. If you ever want to come back, here's an invite: https://discord.gg/RKESYJ6")
    client.channels.get("382499510401630209").send({
        embed: {
            color: 16711680,
            fields: [{
                name: "<:blobwave:364865411344236545> Member Left",
                value: "Member: " + member.user.username + "#" + member.user.discriminator + "\nMember ID: " + member.user.id
            }],

        }
    })
});
client.login(process.env.BOT_TOKEN);
