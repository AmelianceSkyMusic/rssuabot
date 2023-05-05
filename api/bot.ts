import { Bot, webhookCallback } from 'grammy';

// eslint-disable-next-line import/extensions, import/no-unresolved
import { ENV } from '~/constants/ENV';

const { BOT_TOKEN, MODE } = process.env;
if (!BOT_TOKEN) throw new Error('BOT_TOKEN is not defined');

const bot = new Bot(BOT_TOKEN);

bot.command('start', (ctx) => ctx.reply('2023-05-05_17-55'));

if (MODE === 'dev') bot.start();

export default webhookCallback(bot, 'http');

console.log(`BOT HAS STARTED in "${MODE || 'production'}" MODE`);
