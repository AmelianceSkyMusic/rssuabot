import { bot } from '../../../../api/bot';
import { returnError } from '../../helpers/returnError';
import { helpers } from '../helpers';

export function asm() {
	bot.command('asm', async (ctx) => {
		try {
			const messageId = ctx.msg.message_id;
			await helpers.sendMessageHTML(
				ctx,
				'@AmelianceSkyMusic',
			);
			await helpers.removeMessageById({ ctx, messageId });
		} catch (error) { returnError(error); }
	});
}
