// eslint-disable-next-line import/no-extraneous-dependencies
import * as dotenv from 'dotenv';
import { Bot } from 'grammy';

import { returnError } from '~helpers/returnError';

import { getRandomNumber } from './ameliance-scripts/scripts';
import { emoji } from './app/data/emoji';

dotenv.config();

const { BOT_TOKEN } = process.env;
if (!BOT_TOKEN) throw new Error('BOT_TOKEN is not defined');

const bot = new Bot(BOT_TOKEN);

bot.on(':sticker', async (ctx) => {
	const randomEmojiNumber = getRandomNumber(0, emoji.length - 1);
	const randomEmoji = emoji[randomEmojiNumber];
	try {
		await ctx.reply(randomEmoji, { reply_to_message_id: ctx.msg.message_id });
	} catch (error) { returnError(error); }
});

bot.start();
