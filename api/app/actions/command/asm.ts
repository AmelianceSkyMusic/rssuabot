import { bot } from '~/index';
import { returnError } from '~helpers/returnError';

import { helpers } from '../helpers';

export function asm() {
	bot.command('asm', async (ctx) => {
		try {
			const messageId = ctx.msg.message_id;
			await bot.api.sendMessage(
				ctx.chat.id,
				'@AmelianceSkyMusic',
				{ parse_mode: 'HTML' },
			);
			await helpers.removeMessageById(ctx, messageId, 3600);
		} catch (error) { returnError(error); }
	});
}
