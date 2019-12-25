# Minecraft Command Syntax Bot
 Discord bot that helps with Minecraft command syntax.
# Usage
 * `/syntax` - Main help command.<br>
 * `/syntax [MC command without /]` - Tries to check the syntax of the command. Not all commands are fully supported/implemented yet.
# Contributing
 Feel free to make pull requests to add new command syntaxes. The help is appreciated.
 ### Requirements
  * Regular expression that can fully check if the associated command is valid or not.
  * Valid format for JSON and JS file.
 #### Example:
 ```js
 module.exports = {
  main: "gamemode",
  name: "Gamemode",
  regex: /^gamemode (survival|creative|adventure|spectator)( ((([a-zA-Z0-9_]){3,16})|(@s|@a|@p|@r)))?/,
  cmdDesc: "Sets a player's gamemode. Default player is @s (you)"
}
```
# Hosting
 You can host your own version of this bot, you'll need a file named `token.json.env` with the bot token in it.
 #### JSON Structure:
  ```
  {"token": "Put the bot's token here"}
  ```
