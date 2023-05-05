import { Bot, webhookCallback } from 'grammy';

const token = process.env.BOT_TOKEN;
if (!token) throw new Error('BOT_TOKEN is unset');

const bot = new Bot(token);

bot.on(':sticker', async (ctx) => {
	try {
		await ctx.reply('randomEmoji', { reply_to_message_id: ctx.msg.message_id });
	} catch (error) { console.log(error); }
});

export default webhookCallback(bot, 'http');
