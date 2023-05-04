import { bot } from '~/index';
import { returnError } from '~helpers/returnError';

import removeMsgById from '../helpers/removeMessageById';

export function topic() {
	bot.command('topic', async (ctx) => {
		try {
			const messageId = ctx.msg.message_id;
			await bot.api.sendMessage(
				ctx.chat.id,
				'<a href="https://t.me/+H1FJHYfK6Fs2ZTIy">RS School | On Topic</a>',
				{ parse_mode: 'HTML' },
			);
			await removeMsgById(ctx, messageId, 3600);
		} catch (error) { returnError(error); }
	});
}
