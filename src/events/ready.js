const { Routes } = require("discord.js");
module.exports = async (client) => {
    client.user.setPresence({
        activities: [{name: '24/7 (prawie)'}],
    });
};