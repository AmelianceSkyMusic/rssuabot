import { bot } from '~/index';
import { returnError } from '~helpers/returnError';

import { helpers } from '../helpers';

export function dismission() {
	bot.command('dismission', async (ctx) => {
		try {
			const messageId = ctx.msg.message_id;
			await bot.api.sendMessage(
				ctx.chat.id,
				'<a href="https://docs.rs.school/#/dismission">За що відраховуємо</a>',
				{ parse_mode: 'HTML' },
			);
			await helpers.removeMessageById(ctx, messageId, 3600);
		} catch (error) { returnError(error); }
	});
}
