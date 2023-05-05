import { bot } from '../../../../api/bot';
import { helpers } from '../helpers';

export function two() {
	bot.command('two', async (ctx) => {
		const messageId = ctx.msg.message_id;
		await helpers.removeMessageById(ctx, messageId, 0);

		const replyToMessage = ctx.msg.reply_to_message;

		if (replyToMessage) {
			const repliedMessageId = replyToMessage.message_id;

			await ctx.reply(
				'Сідай, 2😅',
				{
					reply_to_message_id: repliedMessageId,
					parse_mode: 'HTML',
				},
			);
		} else {
			await helpers.autoRemovableMessage({
				ctx,
				text: 'команда /two працює тільки як Reply!',
				mention: true,
			});
		}
	});
}
