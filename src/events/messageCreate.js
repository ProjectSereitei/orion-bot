// src/events/messageCreate.js
const { getLevel, getXPForNextLevel, createLevelUpEmbed } = require('../utils/leveling');

module.exports = {
    name: 'messageCreate',
    once: false,

    async execute(message, client) {
        if (message.author.bot || !message.guild) return;

        // ===================== ANTI-SPAM =====================
        if (!client.messageCooldowns) client.messageCooldowns = new Map();

        const userId = message.author.id;
        const now = Date.now();
        const COOLDOWN = 3500; // 3.5 segundos entre mensagens para ganhar XP

        const lastMessage = client.messageCooldowns.get(userId);

        if (lastMessage && now - lastMessage < COOLDOWN) {
            return;
        }

        client.messageCooldowns.set(userId, now);

        // ===================== LEVELING =====================
        if (!client.levels) client.levels = new Map();
        
        const userData = client.levels.get(userId) || { xp: 0, level: 1 };
        
        const xpGain = Math.floor(Math.random() * 8) + 8; // 8 a 15 XP
        userData.xp += xpGain;

        const oldLevel = userData.level;
        const newLevel = getLevel(userData.xp);
        
        if (newLevel > oldLevel) {
            userData.level = newLevel;
            
            const levelUpChannel = message.guild.channels.cache.find(ch => 
                ch.name.toLowerCase().includes('level') || 
                ch.name.toLowerCase().includes('geral') || 
                ch.name.toLowerCase().includes('chat')
            );
            
            if (levelUpChannel) {
                const embed = createLevelUpEmbed(message.member, newLevel, userData.xp);
                levelUpChannel.send({ embeds: [embed] });
            }
        }

        client.levels.set(userId, userData);
    }
};