import { bot } from '../../../../api/bot';
import { getRandomNumber } from '../../../ameliance-scripts/scripts';
import { returnError } from '../../helpers/returnError';
import { phrasesStore } from '../../store/phrasesStore';
import { helpers } from '../helpers';

export function getrandom() {
	bot.command('getrandom', async (ctx) => {
		try {
			try {
				const messageId = ctx.msg.message_id;
				await helpers.removeMessageById({ ctx, messageId, ms: 0 });

				const replyToMessage = ctx.msg.reply_to_message;

				const { chosenPhrasesRandomWords } = phrasesStore.getState();

				if (!chosenPhrasesRandomWords.length) {
					await helpers.autoRemovableMessage({
						ctx,
						text: 'я їм, спробуй пізніше!',
						mention: true,
						ms: 7200,
					});
					return;
				}

				const message = [];
				const countOfWords = getRandomNumber(1, 10);

				for (let i = 0; i < countOfWords; i++) {
					const randomNumOfWordsCount = getRandomNumber(
						0,
						chosenPhrasesRandomWords.length - 1,
					);
					const randomWord = chosenPhrasesRandomWords[randomNumOfWordsCount];
					message.push(randomWord);
				}

				const newMessage = message.join(' ');

				if (replyToMessage) {
					const repliedMessageId = replyToMessage.message_id;

					await helpers.replyHTML(ctx, newMessage, '', repliedMessageId);
				} else {
					await helpers.sendMessageHTML(ctx, newMessage, 'mention');
				}
			} catch (error) { returnError(error); }
		} catch (error) { returnError(error); }
	});
}
