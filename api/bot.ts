// eslint-disable-next-line import/no-extraneous-dependencies
import * as dotenv from 'dotenv';
import { Bot, webhookCallback } from 'grammy';

dotenv.config();

export const ENV = process.env;

const { BOT_TOKEN, MODE } = ENV;
if (!BOT_TOKEN) throw new Error('BOT_TOKEN is not defined');

const bot = new Bot(BOT_TOKEN);

bot.on(':sticker', async (ctx) => {
	try {
		console.log('randomEmoji: ');
		await ctx.reply('randomEmoji', { reply_to_message_id: ctx.msg.message_id });
	} catch (error) { console.log(error); }
});

bot.command('start', (ctx) => ctx.reply('Welcome! Up and running.'));
bot.on('message', (ctx) => ctx.reply('Got another message!'));
if (MODE === 'production') bot.start();

console.log('start bot');
export default webhookCallback(bot, 'http');
