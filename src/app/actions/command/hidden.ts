import { bot } from '../../../../api/bot';
import { hiddenCommands } from '../../data/hiddenCommands';
import { returnError } from '../../helpers/returnError';

export function hidden() {
	bot.command('hidden', async (ctx) => {
		try {
			await ctx.reply(hiddenCommands, { reply_to_message_id: ctx.msg.message_id });
		} catch (error) { returnError(error); }
	});
}
