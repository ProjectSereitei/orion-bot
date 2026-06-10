// src/commands/perfil.js
const { SlashCommandBuilder } = require('discord.js');
const { createCosmicEmbed } = require('../utils/embed');
const { getLevel, getXPForNextLevel, getTitle } = require('../utils/leveling');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('perfil')
        .setDescription('Mostra seu perfil cósmico atualizado')
        .addUserOption(option =>
            option.setName('usuario')
                .setDescription('Ver o perfil de outro membro')
                .setRequired(false)
        ),

    async execute(interaction) {
        const targetUser = interaction.options.getUser('usuario') || interaction.user;
        
        const userData = interaction.client.levels?.get(targetUser.id) || { xp: 0, level: 1 };
        const level = getLevel(userData.xp);
        const xpAtual = userData.xp;
        const xpProximo = getXPForNextLevel(level);
        const progresso = Math.floor((xpAtual / xpProximo) * 100) || 0;

        const member = await interaction.guild.members.fetch(targetUser.id);

        const embed = createCosmicEmbed(
            `✦ Perfil Estelar - ${targetUser.username}`,
            `Membro desde <t:${Math.floor(member.joinedAt.getTime() / 1000)}:R>`
        );

        embed.setThumbnail(targetUser.displayAvatarURL({ dynamic: true, size: 256 }))
             .setColor(0x00FFFF)
             .addFields(
                { name: '🌟 Nível', value: `**${level}**`, inline: true },
                { name: '✨ XP', value: `${xpAtual} / ${xpProximo}`, inline: true },
                { name: '📊 Progresso', value: `${progresso}%`, inline: true },
                { name: '🏆 Título', value: getTitle(level), inline: false }
             );

        await interaction.reply({ embeds: [embed] });
    },
};