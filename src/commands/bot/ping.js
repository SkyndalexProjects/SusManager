const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Check the bot ping"),
    async execute (client, interaction) {
        const embed = new EmbedBuilder()
            .setDescription(`\`\`\`PING: ${client.ws.ping}\`\`\``)
            .setColor("DarkButNotBlack")
        await interaction.reply({ embeds: [embed]})
    }
}