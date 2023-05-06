import { bot } from '../../../../api/bot';
import { api } from '../../api';
import { returnError } from '../../helpers/returnError';
import { phrasesStore } from '../../store/phrasesStore';
import { helpers } from '../helpers';

import 'dotenv/config';

const { GOOGLE_DATA_TABLE_ID } = process.env;

export function set() {
	bot.command('set', async (ctx) => {
		try {
			const messageId = ctx.msg.message_id;
			await helpers.removeMessageById({ ctx, messageId, ms: 0 });

			const replyToMessage = ctx.msg.reply_to_message;

			if (replyToMessage) {
				const repliedMessageId = replyToMessage.message_id;
				const repliedMessageTest = replyToMessage.text || '';

				const response = await api.google.appsscript.postSingleUntitledColumnsDataByIndexes({
					indexesParams: { 1: repliedMessageTest },
					spreadsheetId: GOOGLE_DATA_TABLE_ID || '',
					sheetName: 'chosenPhrases',
				});

				if (response.status === 'success') {
					await helpers.replyHTML(
						ctx,
						`Вітаю! Ваше повідомлення було для наступних поколінь!:\n\n<i>${repliedMessageTest}</i>`,
						'',
						repliedMessageId,
					);
				}

				phrasesStore.getState().fetchChosenPhrases();
			} else {
				await helpers.autoRemovableMessage({
					ctx,
					text: 'команда /set працює тільки як Reply!',
					mention: true,
				});
			}
		} catch (error) { returnError(error); }
	});
}
