// eslint-disable-next-line import/no-extraneous-dependencies
import * as dotenv from 'dotenv';
import { Bot, webhookCallback } from 'grammy';

dotenv.config();

export const ENV = process.env;

const { BOT_TOKEN, HOST_URL, MODE } = ENV;
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
if (!HOST_URL) throw new Error('HOST_URL is not defined');
export default webhookCallback(bot, HOST_URL);
