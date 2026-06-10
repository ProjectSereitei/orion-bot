const { SlashCommandBuilder } = require('discord.js');
const { createCosmicEmbed } = require('../utils/embed');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('orion')
        .setDescription('Mostra informações sobre o servidor Órion e a constelação')
        .addBooleanOption(option =>
            option.setName('detalhado')
                .setDescription('Mostrar informações mais detalhadas')
                .setRequired(false)
        ),

    async execute(interaction) {
        const detalhado = interaction.options.getBoolean('detalhado') || false;

        const embed = createCosmicEmbed(
            '✦ Bem-vindo à Constelação Órion ✦',
            'Uma comunidade para **Gamers** e fãs de **Anime & Mangá**.\nQue as estrelas guiem suas jornadas!'
        );

        embed.setThumbnail('https://i.imgur.com/seu_icone.png');

        if (detalhado) {
            embed.addFields(
                { name: '🌌 Sobre Nós', value: 'Servidor focado em diversão, rolls, jogos e discussões de anime.', inline: false },
                { name: '🎮 Categorias', value: '`•` Anime & Mangá\n`•` Gaming\n`•` Rolls & Gacha\n`•` Eventos & Torneios', inline: false },
                { name: '✨ Dica', value: 'Use `/daily` para sua recompensa estelar diária!', inline: false }
            );
        }

        await interaction.reply({ embeds: [embed] });
    },
};