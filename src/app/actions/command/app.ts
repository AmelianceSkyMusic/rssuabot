import { bot } from '../../../../api/bot';
import { returnError } from '../../helpers/returnError';
import { helpers } from '../helpers';

export function app() {
	bot.command('app', async (ctx) => {
		try {
			const messageId = ctx.msg.message_id;
			await helpers.removeMessageById({ ctx, messageId });

			const replyToMessage = ctx.msg.reply_to_message;
			const text = '<a href="https://docs.rs.school/#/code-of-conduct">Додаток школи</a>';

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
					text,
				);
			}
		} catch (error) { returnError(error); }
	});
}
