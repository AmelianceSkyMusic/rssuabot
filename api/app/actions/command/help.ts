import { bot } from '~/bot';
import { commands } from '~data/commands';
import { returnError } from '~helpers/returnError';

export function help() {
	bot.command('help', async (ctx) => {
		try {
			await ctx.reply(commands, { reply_to_message_id: ctx.msg.message_id });
		} catch (error) { returnError(error); }
	});
}
