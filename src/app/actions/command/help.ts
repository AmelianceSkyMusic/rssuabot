import { bot } from '../../../../api/bot';
import { commands } from '../../data/commands';
import { returnError } from '../../helpers/returnError';
import { helpers } from '../helpers';

export function help() {
	bot.command('help', async (ctx) => {
		try {
			const messageId = ctx.msg.message_id;
			await helpers.removeMessageById({ ctx, messageId });

			const replyToMessage = ctx.msg.reply_to_message;

			if (replyToMessage) {
				const repliedMessageId = replyToMessage.message_id;

				await helpers.replyHTML(
					ctx,
					commands,
					'',
					repliedMessageId,
				);
			} else {
				await helpers.sendMessageHTML(
					ctx,
					commands,
				);
			}
		} catch (error) { returnError(error); }
	});
}
