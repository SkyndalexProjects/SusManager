const { Client } = require('discord.js');
class Base extends Client {
    constructor(clientOptions) {
        super(clientOptions);

        this.version = 'v1.0 BETA';
        this.settingsVersion = 'v0.6';

        this.site = 'https://skyndalex.xyz';
    }
}

module.exports = Base;