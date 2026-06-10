const { SlashCommandBuilder } = require('discord.js');
const { createCosmicEmbed } = require('../utils/embed');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('perfil')
        .setDescription('Mostra seu perfil cósmico com estatísticas no Órion')
        .addUserOption(option =>
            option.setName('usuario')
                .setDescription('Ver o perfil de outro membro')
                .setRequired(false)
        ),

    async execute(interaction) {
        const targetUser = interaction.options.getUser('usuario') || interaction.user;
        const member = await interaction.guild.members.fetch(targetUser.id);

        const nivel = 12;
        const xpAtual = 845;
        const xpProximo = 1200;
        const progresso = Math.floor((xpAtual / xpProximo) * 100);

        const embed = createCosmicEmbed(
            `✦ Perfil Estelar - ${targetUser.username}`,
            `Membro da Constelação Órion desde <t:${Math.floor(member.joinedAt.getTime() / 1000)}:R>`
        );

        embed.setThumbnail(targetUser.displayAvatarURL({ dynamic: true, size: 256 }))
             .setColor(0x00FFFF)
             .addFields(
                { name: '🌟 Nível', value: `**${nivel}**`, inline: true },
                { name: '✨ XP', value: `${xpAtual} / ${xpProximo}`, inline: true },
                { name: '📊 Progresso', value: `${progresso}%`, inline: true },
                { name: '🏆 Título', value: 'Explorador Estelar', inline: false },
                { name: '🎮 Jogos Favoritos', value: 'Genshin Impact, Valorant, Jujutsu Kaisen', inline: false }
             );

        await interaction.reply({ embeds: [embed] });
    },
};