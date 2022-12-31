module.exports = async (client, interaction) => {
    const slashCommand = client.slashCommands.get(interaction.commandName);
    if (!slashCommand) return;

    await slashCommand.execute(client, interaction);
};