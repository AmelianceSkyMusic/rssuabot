import { bot } from '../../../../api/bot';
import { returnError } from '../../helpers/returnError';
import { helpers } from '../helpers';

export function topic() {
	bot.command('topic', async (ctx) => {
		try {
			const messageId = ctx.msg.message_id;
			await bot.api.sendMessage(
				ctx.chat.id,
				'<a href="https://t.me/+H1FJHYfK6Fs2ZTIy">RS School | On Topic</a>',
				{ parse_mode: 'HTML' },
			);
			await helpers.removeMessageById(ctx, messageId, 3600);
		} catch (error) { returnError(error); }
	});
}
