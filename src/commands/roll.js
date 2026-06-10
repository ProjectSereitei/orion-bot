const { SlashCommandBuilder } = require('discord.js');
const { createCosmicEmbed } = require('../utils/embed');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Invocação Estelar - Role para personagens de anime/mangá')
        .addIntegerOption(option =>
            option.setName('quantidade')
                .setDescription('Quantidade de rolls (1-10)')
                .setMinValue(1)
                .setMaxValue(10)
                .setRequired(false)
        ),

    async execute(interaction) {
        const quantidade = interaction.options.getInteger('quantidade') || 1;

        const personagens = [
            { nome: "Levi Ackerman", raridade: "⭐⭐⭐⭐", cor: 0x00FFFF },
            { nome: "Gojo Satoru", raridade: "⭐⭐⭐⭐⭐", cor: 0x8B00FF },
            { nome: "Anya Forger", raridade: "⭐⭐", cor: 0xFF69B4 },
            { nome: "Kirito", raridade: "⭐⭐⭐", cor: 0x00FFAA },
            { nome: "Zero Two", raridade: "⭐⭐⭐⭐", cor: 0xFF1493 },
            { nome: "Megumin", raridade: "⭐⭐⭐", cor: 0xFF4500 },
            { nome: "Tanjiro Kamado", raridade: "⭐⭐⭐", cor: 0xFF0000 },
            { nome: "Rem", raridade: "⭐⭐⭐⭐", cor: 0x00BFFF },
        ];

        const rolls = [];
        let embedColor = 0x6B00FF;

        for (let i = 0; i < quantidade; i++) {
            const random = Math.floor(Math.random() * personagens.length);
            const char = personagens[random];
            rolls.push(`**${char.raridade}** ${char.nome}`);
            if (char.raridade.includes("⭐⭐⭐⭐⭐")) embedColor = 0xFFD700;
        }

        const embed = createCosmicEmbed(
            `🌌 Invocação Estelar - ${interaction.user.username}`,
            `Você invocou **${quantidade}** personagem(s) das estrelas de Órion!`
        );

        embed.setColor(embedColor)
             .addFields({
                 name: '✨ Resultados da Invocação',
                 value: rolls.join('\n'),
                 inline: false
             });

        if (embedColor === 0xFFD700) {
            embed.setDescription('🌟 **SSR PULLED!** As estrelas brilharam intensamente para você!');
        }

        await interaction.reply({ embeds: [embed] });
    },
};