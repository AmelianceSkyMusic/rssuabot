// eslint-disable-next-line import/no-extraneous-dependencies
import * as dotenv from 'dotenv';
import { Bot } from 'grammy';

// eslint-disable-next-line import/no-unresolved, import/extensions
import { actions } from '~app/actions';

dotenv.config();

const { BOT_TOKEN } = process.env;
if (!BOT_TOKEN) throw new Error('BOT_TOKEN is not defined');

export const bot = new Bot(BOT_TOKEN);

actions.on.sticker();
actions.command.help();
actions.command.app();
actions.command.registration();
actions.command.aboutjsfecourse();
actions.command.roadmap();
actions.command.docs();
actions.command.dismission();
actions.command.link();
actions.command.codeofconduct();
actions.command.stickers();
actions.command.topic();

// hidden commands
actions.command.asm();
bot.on(':sticker', async (ctx) => {
	const randomEmojiNumber = getRandomNumber(0, emoji.length - 1);
	const randomEmoji = emoji[randomEmojiNumber];
	try {
		await ctx.reply(randomEmoji, { reply_to_message_id: ctx.msg.message_id });
	} catch (error) { returnError(error); }
});

bot.start();
