import { bot } from '../../../../api/bot';
import { getRandomNumber } from '../../../ameliance-scripts/scripts';
import { returnError } from '../../helpers/returnError';
import { phrasesStore } from '../../store/phrasesStore';
import { helpers } from '../helpers';

export function rd() {
	bot.command('rd', async (ctx) => {
		try {
			try {
				const messageId = ctx.msg.message_id;
				await helpers.removeMessageById({ ctx, messageId, ms: 0 });

				const replyToMessage = ctx.msg.reply_to_message;

				const { randomWords } = phrasesStore.getState();

				if (replyToMessage) {
					const repliedMessageId = replyToMessage.message_id;

					if (!randomWords.length) {
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
						const randomNumOfWordsCount = getRandomNumber(0, randomWords.length - 1);
						const randomWord = randomWords[randomNumOfWordsCount];
						message.push(randomWord);
					}

					await helpers.replyHTML(ctx, message.join(' '), '', repliedMessageId);
				} else {
					await helpers.autoRemovableMessage({
						ctx,
						text: 'команда /rd працює тільки як Reply!',
						mention: true,
					});
				}
			} catch (error) { returnError(error); }
		} catch (error) { returnError(error); }
	});
}
