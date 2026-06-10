// src/events/guildMemberAdd.js
const { createCosmicEmbed } = require('../utils/embed');

module.exports = {
    name: 'guildMemberAdd',
    once: false,

    /**
     * Evento disparado quando um novo membro entra no servidor
     */
    async execute(member, client) {
        // Canal de welcome
        const welcomeChannel = member.guild.channels.cache.find(
            channel => channel.name.includes('welcome') || 
                      channel.name.includes('boas-vindas') ||
                      channel.name.includes('entrada')
        );

        if (!welcomeChannel) {
            console.log('Canal de welcome não encontrado!');
            return;
        }

        const welcomeEmbed = createCosmicEmbed(
            `✦ Bem-vindo à Constelação Órion, ${member.user.username}! ✦`,
            'Que as estrelas iluminem sua jornada!\n\n' +
            '• Leia as **regras** antes de continuar\n' +
            '• Escolha seus **cargos** em #reaction-roles\n' +
            '• Divirta-se com rolls, jogos e anime!'
        );

        welcomeEmbed
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 256 }))
            .setColor(0x00FFFF)
            .setFooter({ 
                text: `Membro #${member.guild.memberCount} • Órion Community`,
                iconURL: member.guild.iconURL()
            });

        await welcomeChannel.send({
            content: `🌌 <@${member.id}> chegou às estrelas!`,
            embeds: [welcomeEmbed]
        });

        console.log(`[WELCOME] Novo membro: ${member.user.tag}`);
    }
};