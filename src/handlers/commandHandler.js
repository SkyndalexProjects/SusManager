const fs = require("fs");;
const path = require("path");
const { Collection } = require("discord.js");

module.exports = (client) => {
    client.slashCommands = new Collection()

    const commandFolders = fs.readdirSync(path.join('./commands'));

    for (const folder of commandFolders) {
        const commandFiles = fs.readdirSync(path.join('./commands', folder)).filter((file) => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`../commands/${folder}/${file}`);

            client.slashCommands.set(command.data.name, command);
        }
    }
}