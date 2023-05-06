import { bot } from '../../../../api/bot';
import { getRandomNumber } from '../../../ameliance-scripts/scripts';
import { returnError } from '../../helpers/returnError';
import { phrasesStore } from '../../store/phrasesStore';
import { helpers } from '../helpers';

export function getphrase() {
	bot.command('getphrase', async (ctx) => {
		try {
			const messageId = ctx.msg.message_id;
			await helpers.removeMessageById({ ctx, messageId, ms: 0 });

			const replyToMessage = ctx.msg.reply_to_message;

			const { chosenPhrases } = phrasesStore.getState();

			if (!chosenPhrases.length) {
				await helpers.autoRemovableMessage({
					ctx,
					text: 'я їм, спробуй пізніше!',
					mention: true,
					ms: 7200,
				});
				return;
			}

			const randomNumOfWordsCount = getRandomNumber(0, chosenPhrases.length - 1);
			const message = chosenPhrases[randomNumOfWordsCount];

			if (replyToMessage) {
				const repliedMessageId = replyToMessage.message_id;

				await helpers.replyHTML(ctx, message, '', repliedMessageId);
			} else {
				await helpers.sendMessageHTML(ctx, message, 'mention');
			}
		} catch (error) { returnError(error); }
	});
}
