const fs = require("fs");
module.exports = (client) => {
    const eventFiles = fs.readdirSync('./events').filter((file) => file.endsWith('.js'));

    for (file of eventFiles) {
        const event = require(`../events/${file}`);
        const eventName = file.split('.js')[0];

        client.on(eventName, (...args) => event(client, ...args));
    }
}