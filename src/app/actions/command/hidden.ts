import { bot } from '../../../../api/bot';
import { hiddenCommands } from '../../data/hiddenCommands';
import { returnError } from '../../helpers/returnError';
import { helpers } from '../helpers';

export function hidden() {
	bot.command('hidden', async (ctx) => {
		try {
			const messageId = ctx.msg.message_id;
			await helpers.removeMessageById({ ctx, messageId });

			const replyToMessage = ctx.msg.reply_to_message;

			if (replyToMessage) {
				const repliedMessageId = replyToMessage.message_id;

				await helpers.replyHTML(
					ctx,
					hiddenCommands,
					'',
					repliedMessageId,
				);
			} else {
				await helpers.sendMessageHTML(
					ctx,
					hiddenCommands,
				);
			}
		} catch (error) { returnError(error); }
	});
}
