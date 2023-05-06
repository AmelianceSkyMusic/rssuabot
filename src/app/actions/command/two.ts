import { bot } from '../../../../api/bot';
import { helpers } from '../helpers';

export function two() {
	bot.command('two', async (ctx) => {
		const messageId = ctx.msg.message_id;
		await helpers.removeMessageById({ ctx, messageId, ms: 0 });

		const replyToMessage = ctx.msg.reply_to_message;

		if (replyToMessage) {
			const repliedMessageId = replyToMessage.message_id;

			await helpers.replyHTML(ctx, 'Сідай, 2😅', '', repliedMessageId);
		} else {
			await helpers.autoRemovableMessage({
				ctx,
				text: 'команда /two працює тільки як Reply!',
				mention: true,
			});
		}
	});
}
