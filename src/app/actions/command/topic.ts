import { bot } from '../../../../api/bot';
import { returnError } from '../../helpers/returnError';
import { helpers } from '../helpers';

export function topic() {
	bot.command('topic', async (ctx) => {
		try {
			const messageId = ctx.msg.message_id;
			await helpers.removeMessageById({ ctx, messageId });

			const replyToMessage = ctx.msg.reply_to_message;
			const text = '<a href="https://t.me/+H1FJHYfK6Fs2ZTIy">RS School | On Topic</a>';

			if (replyToMessage) {
				const repliedMessageId = replyToMessage.message_id;

				await helpers.replyHTML(
					ctx,
					text,
					'',
					repliedMessageId,
				);
			} else {
				await helpers.sendMessageHTML(
					ctx,
					'<a href="https://t.me/+H1FJHYfK6Fs2ZTIy">RS School | On Topic</a>',
				);
			}
		} catch (error) { returnError(error); }
	});
}
