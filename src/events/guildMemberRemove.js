const {EmbedBuilder} = require("discord.js");
module.exports = async (client, member) => {
    const embed = new EmbedBuilder()
        .setDescription(`- ${member.user.username}#${member.user.discriminator} [${member.id}]`)
        .setColor("DarkRed")
    await client.channels.cache.get("nie ma jeszcze").send({ embeds: [embed] })
};