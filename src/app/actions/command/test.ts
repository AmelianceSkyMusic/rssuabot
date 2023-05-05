import { returnError } from '~helpers/returnError';
import { bot } from '~root/bot';

export function test() {
	bot.command('test', async (ctx) => {
		try {
			await ctx.reply('test4', { reply_to_message_id: ctx.msg.message_id });
		} catch (error) { returnError(error); }
	});
}
