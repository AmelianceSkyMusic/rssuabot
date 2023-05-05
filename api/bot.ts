import { Bot, webhookCallback } from 'grammy';

const bot = new Bot(process.env.BOT_TOKEN || '');

bot.on('message', async (ctx) => {
	await ctx.reply(ctx.msg.text || '');
});

export default async (req: any, res: any) => {
	await bot.api.setWebhook(process.env.WEBHOOK || '');
	webhookCallback(bot, 'http')(req, res);
};
