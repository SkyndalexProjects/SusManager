const { token } = require("./config.json").discord;
const Base = require('./client.js');
const { Options, GatewayIntentBits } = require('discord.js');
const fs = require("fs")
const { REST } = require('@discordjs/rest');
const { Routes } = require("discord.js");
const client = new Base({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION' ],
    makeCache: Options.cacheWithLimits({
        MessageManager: 200,
        PresenceManager: 0,
        // UserManager: 0,
    }),
});

require("./handlers/eventHandler")(client);
require("./handlers/commandHandler")(client)

if (process.argv.includes('--deploy-commands')) {
    const commands = [];
    const rest = new REST({ version: '10' }).setToken(token);

    const commandFolders = fs.readdirSync('./commands');

    for (const folder of commandFolders) {
        const commandFiles = fs.readdirSync(`./commands/${folder}`).filter((file) => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`./commands/${folder}/${file}`);
            commands.push(command.data.toJSON());
        }
    }
    rest.put(Routes.applicationGuildCommands("1058806222939234304", "1018622871347662950"), { body: commands })
        .then((data) => console.log("ok"))
        .catch(console.error);

    console.log("[REST] Successfully updated commands")
} else {
    process.on("unhandledRejection", async (reason, p) => {
        console.log(" [antiCrash] :: Unhandled Rejection/Catch");
        console.log(reason, p);
    });
    process.on("uncaughtException", async (err, origin) => {
        console.log(" [antiCrash] :: Uncaught Exception/Catch");
        console.log(err, origin);
    });
    process.on("uncaughtExceptionMonitor", async (err, origin) => {
        console.log(" [antiCrash] :: Uncaught Exception/Catch (MONITOR)");
        console.log(err, origin);
    });
}

client.login(token)