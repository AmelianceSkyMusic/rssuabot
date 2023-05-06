import { bot } from '../../../../api/bot';
import { returnError } from '../../helpers/returnError';

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
			await ctx.reply([
				studentPhrases.join(', '),
				randomPhrases.join(', '),
				randomClickPhrases.join(', '),
				chatReplies.join(', '),
			].join('\n'), { reply_to_message_id: ctx.msg.message_id });
		} catch (error) { returnError(error); }
	});
}
