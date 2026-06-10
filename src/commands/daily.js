const { SlashCommandBuilder } = require('discord.js');
const { createCosmicEmbed } = require('../utils/embed');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('daily')
        .setDescription('Receba sua recompensa estelar diária'),

    async execute(interaction) {
        const userId = interaction.user.id;
        
        if (!client.dailyCooldowns) client.dailyCooldowns = new Map();

        const cooldown = client.dailyCooldowns.get(userId);
        const now = Date.now();

        const COOLDOWN_TIME = 24 * 60 * 60 * 1000;

        if (cooldown && now - cooldown < COOLDOWN_TIME) {
            const timeLeft = Math.ceil((COOLDOWN_TIME - (now - cooldown)) / (1000 * 60 * 60));
            const embedError = createCosmicEmbed(
                '⏳ Cooldown Ativo',
                `Você já coletou sua recompensa hoje.\nPróxima recompensa em **${timeLeft} horas**.`
            );
            return interaction.reply({ embeds: [embedError], ephemeral: true });
        }

        const recompensaXP = Math.floor(Math.random() * 150) + 100;
        const recompensaKakera = Math.floor(Math.random() * 8) + 3;

        client.dailyCooldowns.set(userId, now);

        const embed = createCosmicEmbed(
            '🌟 Recompensa Estelar Recebida!',
            `As estrelas de Órion abençoaram você hoje, <@${userId}>!`
        );

        embed.setColor(0x00FFAA)
             .addFields(
                { name: '✨ Experiência Ganha', value: `**+${recompensaXP} XP**`, inline: true },
                { name: '🔮 Kakera Estelar', value: `**+${recompensaKakera}**`, inline: true },
                { name: '🌌 Mensagem das Estrelas', value: 'Continue brilhando na constelação!', inline: false }
             );

        await interaction.reply({ embeds: [embed] });
    },
};