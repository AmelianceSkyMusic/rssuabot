import { bot } from '../../../../api/bot';
import { getRandomNumber } from '../../../ameliance-scripts/scripts';
import { emoji } from '../../data/emoji';
import { returnError } from '../../helpers/returnError';
import { helpers } from '../helpers';

export function sticker() {
	bot.on(':sticker', async (ctx) => {
		const randomEmojiNumber = getRandomNumber(0, emoji.length - 1);
		const randomEmoji = emoji[randomEmojiNumber];
		try {
			await helpers.reply(ctx, randomEmoji);
		} catch (error) { returnError(error); }
	});
}
