var discord = require('discord.js');
var fs = require('fs');
var client = new discord.Client();
var commands = [];

var env = fs.readFileSync('./token.json.env', 'utf-8');
env = JSON.parse(env);

function refreshCommands() {
    //Read all names of the files in the ./commands/ foloder
    let out = fs.readdirSync('./commands/');
    commands = [];
    for (i in out) {
        if (out[i].match(/.+\.js/)) { //if file has a .js extension
            let x = require('./commands/' + out[i]); //require its command data
            if (x.name && x.main && x.regex) { // if file has all required data
                commands.push(x); //Add it to command list
            }
        }
    }
    return commands; //debug: returns new command list
}

client.on('ready', () => {
    refreshCommands();
    console.log('Starting...');
    console.log('Currently detected commands:');
    client.user.setPresence({
        game: {
            name: 'for /syntax',
            type: 'WATCHING'
        },
        status: 'online'
    })
    for (i in commands) {
        console.log('   /' + commands[i].main);
    }
});

client.on('message', message => {
    if (!message.author.bot) {
        syntaxCommand(message)
    }
});
/**
 * Parses a Discord message for the /syntax command.
 * @param {discord.Message} message 
 */
function syntaxCommand(message) {
        if (message.content.match(/^\/syntax.*/)) { //if message is the /syntax command
            if (message.content.match(/^\/syntax$/)) { //if /syntax command is by itself
                let embed = { //intial info embed
                    title: 'Minecraft Command Syntax Bot',
                    footer: {
                        text: 'Made by Sulfrix#7440. Say hi to him!',
                        icon_url: 'https://sulfrix.github.io/Newavatar.png'
                    },
                    description: 'Checks if a MC command has the correct syntax. **Work in progress!**',
                    fields: [{
                        name: 'Usage:',
                        value: '```/syntax [MC Command without /]```'
                    }]
                };
                message.channel.send('Hello!', {
                    embed
                });
            }
            if (message.content.match(/^\/syntax .+/)) { //if syntax command has more arguments
                let checkCommand = message.content.match(/(?<=^\/syntax ).+/)[0] //sets a string var to message content after /syntax command
                let x
                for (i in commands) { //loop through all available commands
                    if (checkCommand.match(commands[i].regex)) { //if command matches with indexed command data
                        x = checkCommand.match(commands[i].regex)[0] //set it to the match data
                        if (x == checkCommand) { //if match and inital command are equal, user puts in correct command
                            let embed = { //Embed if user is correct on syntax, no difference from regex
                                "author": {
                                    "name": "Minecraft Command Syntax Bot",
                                    "icon_url": "https://sulfrix.github.io/syntaxBotIcon.png"
                                },
                                "title": "Syntax Result",
                                "footer": {
                                    "text": "Made by Sulfrix#7440. Say hi to him!",
                                    "icon_url": "https://sulfrix.github.io/Newavatar.png"
                                },
                                "description": "**This is correct syntax!**",
                                "fields": [{
                                    "name": "Command:",
                                    "value": `\`\`\`${x}\`\`\``
                                }]
                            };
                            message.channel.send("I checked the syntax of that command...", {
                                embed
                            });
                            break
                        } else {
                            let embed = { //Embed for if user is slightly off with their command (incorrect syntax, regex still detects it)
                                "author": {
                                    "name": "Minecraft Command Syntax Bot",
                                    "icon_url": "https://sulfrix.github.io/syntaxBotIcon.png"
                                },
                                "title": "Syntax Result",
                                "footer": {
                                    "text": "Made by Sulfrix#7440. Say hi to him!",
                                    "icon_url": "https://sulfrix.github.io/Newavatar.png"
                                },
                                "description": "The syntax is a little off, but I still detected it!",
                                "fields": [{
                                        "name": "Your Command:",
                                        "value": `\`\`\`${checkCommand}\`\`\``
                                    },
                                    {
                                        "name": "Correct Command:",
                                        "value": `\`\`\`${x}\`\`\``
                                    }
                                ]
                            };
                            message.channel.send("I checked the syntax of that command...", {
                                embed
                            });
                            break
                        }
                    }

                }
                if (!x) { //if no correct command was found
                    let embed = { //embed for no command found
                        "author": {
                            "name": "Minecraft Command Syntax Bot",
                            "icon_url": "https://sulfrix.github.io/syntaxBotIcon.png"
                        },
                        "title": "Syntax Result",
                        "footer": {
                            "text": "Made by Sulfrix#7440. Say hi to him!",
                            "icon_url": "https://sulfrix.github.io/Newavatar.png"
                        },
                        "description": "I couldn't detect this command. Check spaces, player names, etc.",
                        "fields": [{
                            "name": "Your Command:",
                            "value": `\`\`\`${checkCommand}\`\`\``
                        }]
                    };
                    message.channel.send("What?", {
                        embed
                    });
                }
            }
        }
}

client.login(env.token); //start the bot