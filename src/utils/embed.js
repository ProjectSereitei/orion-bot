const { EmbedBuilder } = require('discord.js');

/**
 * Cria um embed temático cósmico para o servidor Órion
 * @param {string} title - Título do embed
 * @param {string} description - Descrição (opcional)
 * @returns {EmbedBuilder}
 */
function createCosmicEmbed(title, description = null) {
    return new EmbedBuilder()
        .setColor(0x6B00FF)
        .setTitle(title)
        .setDescription(description)
        .setTimestamp()
        .setFooter({ 
            text: '✦ Órion • Comunidade de Gamers & Anime',
            iconURL: null
        });
}

module.exports = { createCosmicEmbed };