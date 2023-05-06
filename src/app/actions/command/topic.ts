import { bot } from '../../../../api/bot';
import { returnError } from '../../helpers/returnError';
import { helpers } from '../helpers';

export function topic() {
	bot.command('topic', async (ctx) => {
		try {
			const messageId = ctx.msg.message_id;
			await helpers.sendMessageHTML(
				ctx,
				'<a href="https://t.me/+H1FJHYfK6Fs2ZTIy">RS School | On Topic</a>',
			);
			await helpers.removeMessageById({ ctx, messageId });
		} catch (error) { returnError(error); }
	});
}
