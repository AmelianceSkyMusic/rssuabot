import { bot } from '../../core/bot';

export function test() {
	bot.command('test', async (ctx) => {
		try {
			await ctx.reply('test2', { reply_to_message_id: ctx.msg.message_id });
		} catch (error) { console.log(error); }
	});
}
