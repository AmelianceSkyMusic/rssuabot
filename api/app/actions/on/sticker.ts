import { getRandomNumber } from '~/ameliance-scripts/scripts';
import { bot } from '~/index';
import { emoji } from '~data/emoji';
import { returnError } from '~helpers/returnError';

export function sticker() {
	bot.on(':sticker', async (ctx) => {
		const randomEmojiNumber = getRandomNumber(0, emoji.length - 1);
		const randomEmoji = emoji[randomEmojiNumber];
		try {
			await ctx.reply(randomEmoji, { reply_to_message_id: ctx.msg.message_id });
		} catch (error) { returnError(error); }
	});
}
