import { bot } from '~/index';
import { returnError } from '~helpers/returnError';

import removeMsgById from '../helpers/removeMessageById';

export function link() {
	bot.command('link', async (ctx) => {
		try {
			const messageId = ctx.msg.message_id;
			await bot.api.sendMessage(
				ctx.chat.id,
				'<a href="https://t.me/RSSchoolUkraine">RS School | Ukraine</a>',
				{ parse_mode: 'HTML' },
			);
			await removeMsgById(ctx, messageId, 3600);
		} catch (error) { returnError(error); }
	});
}
