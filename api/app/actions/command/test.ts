import { bot } from '~/bot';
import { returnError } from '~helpers/returnError';
import { phrasesStore } from '~store/phrasesStore';

export function test() {
	bot.command('test', async (ctx) => {
		try {
			await ctx.reply('test', { reply_to_message_id: ctx.msg.message_id });
			const {
				studentPhrases,
				randomPhrases,
				randomClickPhrases,
				chatReplies,
			} = phrasesStore.getState();
			console.log('studentPhrases: ', studentPhrases);
			console.log('randomPhrases: ', randomPhrases);
			console.log('randomClickPhrases: ', randomClickPhrases);
			console.log('chatReplies: ', chatReplies);
		} catch (error) { returnError(error); }
	});
}
