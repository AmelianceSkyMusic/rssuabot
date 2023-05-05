import { webhookCallback } from 'grammy';

import { bot } from '../src/app/core/bot';

import 'dotenv/config';

export const ENV = process.env;

const { MODE } = ENV;

if (MODE === 'dev') bot.start();

export default webhookCallback(bot, 'http');

// eslint-disable-next-line no-console
console.log(`BOT HAS STARTED in "${MODE || 'production'}" MODE`);
