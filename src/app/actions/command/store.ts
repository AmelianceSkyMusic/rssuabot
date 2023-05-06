import { bot } from '../../../../api/bot';
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
			} = phrasesStore.getState();

			const message = '<b>phrasesStore<b>'
			+ `\nloading: ${!!phrasesStoreLoading}`
			+ `\nerror: ${!!phrasesStoreError}`
			+ `\nstudentPhrases: ${!!studentPhrases.length}`
			+ `\nrandomPhrases: ${!!randomPhrases.length}`
			+ `\nrandomClickPhrases: ${!!randomClickPhrases.length}`
			+ `\nchatReplies: ${!!chatReplies.length}`;

			console.log('message: ', message);

			const messageId = ctx.msg.message_id;
			await helpers.removeMessageById(ctx, messageId, 0);

			await bot.api.sendMessage(
				ctx.chat.id,
				message,
				{ parse_mode: 'HTML' },
			);
		} catch (error) { returnError(error); }
	});
}
