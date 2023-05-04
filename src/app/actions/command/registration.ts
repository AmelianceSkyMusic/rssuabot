import { bot } from '~/index';
import { returnError } from '~helpers/returnError';

import removeMsgById from '../helpers/removeMessageById';

export function registration() {
	bot.command('registration', async (ctx) => {
		try {
			const messageId = ctx.msg.message_id;
			await bot.api.sendMessage(
				ctx.chat.id,
				'<a href="https://app.rs.school/registry/student">Реєстрація</a>',
				{ parse_mode: 'HTML' },
			);
			await removeMsgById(ctx, messageId, 5600);
		} catch (error) { returnError(error); }
	});
}
