require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
    ]
});

client.commands = new Collection();
client.dailyCooldowns = new Map(); // Cooldown global para /daily

// ==================== HANDLER DE COMANDOS ====================
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
        console.log(chalk.green(`[✓] Comando carregado: /${command.data.name}`));
    } else {
        console.log(chalk.yellow(`[⚠] Comando inválido: ${file}`));
    }
}

// ==================== EVENTO READY ====================
client.once('ready', () => {
    console.log(chalk.cyan(`🚀 Órion Bot online! Logado como ${client.user.tag}`));
    client.user.setActivity('as estrelas de Órion ✨', { type: 'WATCHING' });
});

// ==================== INTERACTIONS ====================
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
    
    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(chalk.red(error));
        await interaction.reply({ 
            content: '❌ Ocorreu um erro ao executar esse comando!', 
            ephemeral: true 
        });
    }
});

client.login(process.env.TOKEN);