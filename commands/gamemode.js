module.exports = {
    main: "gamemode",
    name: "Gamemode",
    regex: /^gamemode (survival|creative|adventure|spectator)( ((([a-zA-Z0-9_]){3,16})|(@s|@a|@p|@r)))?/,
    cmdDesc: "Sets a player's gamemode. Default player is @s (you)"
}