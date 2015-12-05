var Discord = require("discord.js");

var twitteruser   = require("./twitteruser.json");

var wa = require("./wolfram_plugin");
var wolfram_plugin = new wa();

// Get the email and password
var AuthDetails = require("./auth.json");
var qs = require("querystring");

var htmlToText = require('html-to-text');

var lastCommandUsed = "";

var bot = new Discord.Client();


bot.on("ready", function () {
  console.log("Ready to begin! Serving in " + bot.channels.length + " channels");
});

bot.on("disconnected", function () {

  console.log("Disconnected!");
  process.exit(1); //exit node.js with an error
  
});

bot.on("message", function(msg) {
  //Checks if the message is a command
  //change the $ to whatever you want your prefix to be
  if (msg.content[0] === '$') {
    var command = msg.content.toLowerCase().split(" ")[0].substring(1);
    var suffix = msg.content.toLowerCase().substring(command.length + 2);
    var cmd = commands[command];
    if (cmd) {
      cmd.process(bot, msg, suffix);
    }
  }
});

//Log user status changes
bot.on("presence", function(data) {
  //if(status === "online"){
  //console.log("presence update");
  console.log(data.user+" just went "+data.status);
  //}
});

//commands go here. i left an example of how to structure them.
var commands = {
        "ping": {
     description: "Pongs the user, showing the bot is alive.",
        process: function(bot, msg, suffix) {
          bot.sendMessage(msg.channel, msg.sender + " **Pong!**")
           return lastCommandUsed = "**ping**"
          }
    },
    "pong": {
      process: function(bot, msg) {
        bot.sendMessage(msg.channel, msg.sender + " Ping!");
      }
    }
};


//IF YOU ARE GOING TO HAVE VARIABLES FOR YOUR COMMANDS, PUT THEM HERE.


//once commands are loaded, bot logs in.
bot.login(AuthDetails.email, AuthDetails.password);