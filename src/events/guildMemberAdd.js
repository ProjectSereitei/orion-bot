// src/events/guildMemberAdd.js
const { EmbedBuilder } = require('discord.js');
const { createCosmicEmbed } = require('../utils/embed');

const chalk = require('chalk');

module.exports = {
    name: 'guildMemberAdd',
    once: false,

    async execute(member, client) {
        const welcomeChannel = member.guild.channels.cache.find(
            channel => channel.name.toLowerCase().includes('welcome') || 
                      channel.name.toLowerCase().includes('boas-vindas') ||
                      channel.name.toLowerCase().includes('entrada')
        );

        if (!welcomeChannel) {
            console.log('Canal de welcome não encontrado!');
            return;
        }

        const welcomeEmbed = createCosmicEmbed(
            `✦ Bem-vindo à Constelação Órion, ${member.user.username}! ✦`,
            'Que as estrelas iluminem sua jornada!\n\n' +
            '• Leia as **regras**\n' +
            '• Escolha seus cargos em #reaction-roles\n' +
            '• Use /daily para sua primeira recompensa estelar!'
        );

        welcomeEmbed
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 256 }))
            .setColor(0x00FFFF)
            .setFooter({ 
                text: `Membro #${member.guild.memberCount} • Órion`,
                iconURL: member.guild.iconURL()
            });

        await welcomeChannel.send({
            content: `🌌 <@${member.id}> chegou às estrelas!`,
            embeds: [welcomeEmbed]
        });

        console.log(chalk.cyan(`[WELCOME] Novo membro: ${member.user.tag}`));
    }
};
