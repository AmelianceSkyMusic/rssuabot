import { bot } from '../../../../api/bot';
import { appLog } from '../../helpers/appLog';
import { returnError } from '../../helpers/returnError';
import { phrasesStore } from '../../store/phrasesStore';
import { helpers } from '../helpers';

export function store() {
	bot.command('store', async (ctx) => {
		try {
			const {
				loading: phrasesStoreLoading,
				error: phrasesStoreError,
				studentPhrases,
				randomPhrases,
				randomClickPhrases,
				chatReplies,
				chosenPhrases,
			} = phrasesStore.getState();

			const message = '<b>phrasesStore</b>'
			+ `\nloading: ${!!phrasesStoreLoading}`
			+ `\nerror: ${!!phrasesStoreError}`
			+ `\nstudentPhrases: ${!!studentPhrases.length}`
			+ `\nrandomPhrases: ${!!randomPhrases.length}`
			+ `\nrandomClickPhrases: ${!!randomClickPhrases.length}`
			+ `\nchatReplies: ${!!chatReplies.length}`
			+ `\nchosenPhrases: ${!!chosenPhrases.length}`;

			appLog('message: ', message);

			const messageId = ctx.msg.message_id;
			await helpers.removeMessageById({ ctx, messageId, ms: 0 });

			await helpers.sendMessageHTML(ctx, message);
		} catch (error) { returnError(error); }
	});
}
