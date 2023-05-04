import { bot } from '~/index';
import { returnError } from '~helpers/returnError';

import removeMsgById from '../helpers/removeMessageById';

export function codeofconduct() {
	bot.command('codeofconduct', async (ctx) => {
		try {
			const messageId = ctx.msg.message_id;
			await bot.api.sendMessage(
				ctx.chat.id,
				'<a href="https://docs.rs.school/#/code-of-conduct">Норми поведінки</a>',
				{ parse_mode: 'HTML' },
			);
			await removeMsgById(ctx, messageId, 3600);
		} catch (error) { returnError(error); }
	});
}
