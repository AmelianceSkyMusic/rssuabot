import { Bot } from 'grammy';

import { ENV } from '../../../api/bot';
import { actions } from '../actions';

const { BOT_TOKEN } = ENV;

if (!BOT_TOKEN) throw new Error('BOT_TOKEN is not defined');

export const bot = new Bot(BOT_TOKEN);

bot.command('start', (ctx) => ctx.reply('_2023-05-05_23-46'));
actions.command.test();
