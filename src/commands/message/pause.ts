import { Message, player } from '../../client';

module.exports = {
    name: 'pause',
    async execute(message: Message) {
        const queue = player.nodes.get(message.guild.id);
        if (queue?.isPlaying() == null || queue.isPlaying() === false) return message.reply('**Tidak ada music yang berjalan**');
        if (!message.member.voice.channel) return message.reply('**Kamu tidak divoice channel!**');
        if (message.guild.members.me.voice.channel && message.member.voice.channel.id !== message.guild.members.me.voice.channel.id) return message.reply('**Kamu tidak divoice channel yang sama!**');
        if (queue.node.isPaused() === true) return message.reply('**Lagu sedang dipause**');
        queue.node.setPaused(true);
        await message.reply('**Lagu telah dipause**');
    }
};
