import { bot } from '../../../../api/bot';
import { returnError } from '../../helpers/returnError';
import { helpers } from '../helpers';
import { sendMessage } from '../helpers/sendMessage';

export function test() {
	bot.command('test', async (ctx) => {
		try {
			const messageId = ctx.msg.message_id;
			await helpers.removeMessageById({ ctx, messageId });

			const botMessage = await sendMessage(ctx, 'test');
			if (botMessage) await helpers.removeMessageById({ ctx, messageId: botMessage.message_id });
		} catch (error) { returnError(error); }
	});
}
