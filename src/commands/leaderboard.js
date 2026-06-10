const { SlashCommandBuilder } = require('discord.js');
const { createCosmicEmbed } = require('../utils/embed');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leaderboard')
        .setDescription('Mostra o Top 10 membros mais brilhantes da Constelação Órion')
        .addStringOption(option =>
            option.setName('categoria')
                .setDescription('Categoria do ranking')
                .setRequired(false)
                .addChoices(
                    { name: 'Nível (XP)', value: 'nivel' },
                    { name: 'Rolls', value: 'rolls' },
                    { name: 'Eventos', value: 'eventos' }
                )
        ),

    async execute(interaction) {
        const topPlayers = [
            { user: "EstrelaEterna", nivel: 47 },
            { user: "NebulosaKira", nivel: 42 },
            { user: "CosmicGamer", nivel: 38 },
            { user: "AnimeVoid", nivel: 35 },
            { user: "ShadowNova", nivel: 31 }
        ];

        let description = '';
        topPlayers.forEach((entry, index) => {
            const medalha = index === 0 ? '👑' : index === 1 ? '🥈' : index === 2 ? '🥉' : `**${index + 1}**`;
            description += `${medalha} **${entry.user}** — Nível **${entry.nivel}**\n`;
        });

        const embed = createCosmicEmbed(
            '🏆 Ranking Estelar de Órion',
            `**Top 5 Guardiões da Constelação**\n\n${description}`
        );

        embed.setColor(0xFFD700);

        await interaction.reply({ embeds: [embed] });
    },
};