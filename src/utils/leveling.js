// src/utils/leveling.js
const { createCosmicEmbed } = require('./embed');

/**
 * Calcula o nível baseado no XP
 */
function getLevel(xp) {
    return Math.floor(Math.sqrt(xp / 25)) + 1;
}

/**
 * Calcula o XP necessário para o próximo nível
 */
function getXPForNextLevel(currentLevel) {
    return Math.floor(25 * Math.pow(currentLevel, 2));
}

/**
 * Retorna título baseado no nível
 */
function getTitle(level) {
    const titles = [
        'Viajante Estelar', 'Explorador Cósmico', 'Guardião de Órion',
        'Ascendido das Estrelas', 'Lenda da Constelação', 'Soberano Celestial'
    ];
    return titles[Math.min(Math.floor(level / 10), titles.length - 1)];
}

/**
 * Cria embed de Level Up
 */
function createLevelUpEmbed(member, newLevel, xp) {
    const embed = createCosmicEmbed(
        `🌟 ASCENSÃO ESTELAR!`,
        `<@${member.id}> subiu de nível!`
    );
    
    embed.setColor(0x00FFAA)
         .addFields(
            { name: '✨ Novo Nível', value: `**${newLevel}**`, inline: true },
            { name: '🌌 XP Atual', value: `${xp}`, inline: true },
            { name: '🏆 Título', value: getTitle(newLevel), inline: false }
         )
         .setThumbnail(member.user.displayAvatarURL({ dynamic: true }));

    return embed;
}

module.exports = {
    getLevel,
    getXPForNextLevel,
    createLevelUpEmbed,
    getTitle
};