import { bot } from '~/bot';
import { returnError } from '~helpers/returnError';

import { helpers } from '../helpers';

export function stickers() {
	bot.command('stickers', async (ctx) => {
		try {
			const messageId = ctx.msg.message_id;
			await bot.api.sendMessage(
				ctx.chat.id,
				'<a href="https://t.me/addstickers/RSSchool_Ukraine">Стікери</a>',
				{ parse_mode: 'HTML' },
			);
			await helpers.removeMessageById(ctx, messageId, 3600);
		} catch (error) { returnError(error); }
	});
}
