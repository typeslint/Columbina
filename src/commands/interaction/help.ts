import fs from 'node:fs';
import path from 'node:path';
import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, EmbedBuilder } from '../../client';
import { prefix } from '../../data/config';

module.exports = {
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Help command'),
    async execute(interaction: CommandInteraction) {
        const commandsFolder = path.join(__dirname, '../../commands/message');
        const commandFiles = fs.readdirSync(commandsFolder).filter((file) => file.endsWith('.js'));

        const commands: string[] = [];

        for (const file of commandFiles) {
            const command = require(path.join(commandsFolder, file));
            if (command.name) commands.push(command.name);
        }

        const embed = new EmbedBuilder()

        .setColor('#89e0dc')
        .setTitle('Help commands')
        .setThumbnail(interaction.client.user.avatarURL({extension: 'png', forceStatic: false, size: 4096}))
        .setDescription(`Prefix = **${prefix}**`)
        .addFields({ name: 'General command', value: commands.sort((a, b) => a.localeCompare(b)).join(', ') })
        .setFooter({ text: `Direquest oleh ${interaction.user.username}`, iconURL: interaction.user.avatarURL({ extension: 'png', forceStatic: false, size: 1024 }) })
        .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
