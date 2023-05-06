import { bot } from '../../../../api/bot';
import { getRandomNumber } from '../../../ameliance-scripts/scripts';
import { returnError } from '../../helpers/returnError';
import { phrasesStore } from '../../store/phrasesStore';
import { helpers } from '../helpers';

export function ph() {
	bot.command('ph', async (ctx) => {
		try {
			const messageId = ctx.msg.message_id;
			await helpers.removeMessageById({ ctx, messageId, ms: 0 });

			const replyToMessage = ctx.msg.reply_to_message;

			const { chatReplies } = phrasesStore.getState();

			if (replyToMessage) {
				const repliedMessageId = replyToMessage.message_id;

				if (!chatReplies.length) {
					await helpers.autoRemovableMessage({
						ctx,
						text: 'я їм, спробуй пізніше!',
						mention: true,
						ms: 7200,
					});
					return;
				}

				const randomNumOfWordsCount = getRandomNumber(0, chatReplies.length - 1);
				const message = chatReplies[randomNumOfWordsCount];

				await helpers.replyHTML(ctx, message, '', repliedMessageId);
			} else {
				await helpers.autoRemovableMessage({
					ctx,
					text: 'команда /two працює тільки як Reply!',
					mention: true,
				});
			}
		} catch (error) { returnError(error); }
	});
}
