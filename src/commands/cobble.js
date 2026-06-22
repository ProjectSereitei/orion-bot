const { SlashCommandBuilder } = require('discord.js');
const { createCosmicEmbed } = require('../utils/embed');
const { getPokemonData } = require('../utils/pokeapi');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cobble')
        .setDescription('Comandos do Cobblemon usando dados reais')
        .addSubcommand(sub =>
            sub.setName('dex')
                .setDescription('Mostra informações detalhadas do Pokémon')
                .addStringOption(opt => 
                    opt.setName('pokemon').setDescription('Nome do Pokémon').setRequired(true)
                )
        )
        .addSubcommand(sub =>
            sub.setName('spawn')
                .setDescription('Informações de spawn no Cobblemon')
                .addStringOption(opt => 
                    opt.setName('pokemon').setDescription('Nome do Pokémon').setRequired(true)
                )
        ),

    async execute(interaction) {
        await interaction.deferReply();

        const subcommand = interaction.options.getSubcommand();
        const pokemon = interaction.options.getString('pokemon');

        if (subcommand === 'dex') {
            const data = await getPokemonData(pokemon);

            if (!data) {
                return interaction.editReply(`❌ Pokémon **${pokemon}** não encontrado.`);
            }

            const embed = createCosmicEmbed(
                `📖 Pokédex #${data.id} - ${data.name.toUpperCase()}`,
                `Tipos: **${data.types.join(' / ')}**`
            );

            embed.setThumbnail(data.sprite)
                 .addFields(
                    { name: 'Altura', value: `${data.height}m`, inline: true },
                    { name: 'Peso', value: `${data.weight}kg`, inline: true },
                    { name: 'Stats Base', value: Object.entries(data.stats)
                        .map(([stat, value]) => `**${stat}**: ${value}`).join('\n'), inline: false }
                 );

            await interaction.editReply({ embeds: [embed] });
        } 
        else if (subcommand === 'spawn') {
            const embed = createCosmicEmbed(
                `🌍 Spawn - ${pokemon}`,
                'Informações específicas de spawn do Cobblemon estão em desenvolvimento.\n\nUse `/cobble dex` para ver os dados básicos.'
            );
            await interaction.editReply({ embeds: [embed] });
        }
    },
};