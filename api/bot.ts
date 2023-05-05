import { Bot, webhookCallback } from 'grammy';

import 'dotenv/config';

export const ENV = process.env;

const { BOT_TOKEN, MODE } = ENV;

if (!BOT_TOKEN) throw new Error('BOT_TOKEN is not defined');

export const bot = new Bot(BOT_TOKEN);

bot.command('start', (ctx) => ctx.reply('_2023-05-05_18-20'));

if (MODE === 'dev') bot.start();

export default webhookCallback(bot, 'http');

// eslint-disable-next-line no-console
console.log(`BOT HAS STARTED in "${MODE || 'production'}" MODE`);
