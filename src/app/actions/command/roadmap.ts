import { bot } from '~/index';
import { returnError } from '~helpers/returnError';

import removeMsgById from '../helpers/removeMessageById';

export function roadmap() {
	bot.command('roadmap', async (ctx) => {
		try {
			const messageId = ctx.msg.message_id;
			await bot.api.sendMessage(
				ctx.chat.id,
				'<a href="https://github.com/rolling-scopes-school/tasks/blob/master/roadmap.md">Програма навчання</a>',
				{ parse_mode: 'HTML' },
			);
			await removeMsgById(ctx, messageId, 3600);
		} catch (error) { returnError(error); }
	});
}
