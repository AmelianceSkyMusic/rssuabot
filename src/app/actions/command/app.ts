import { bot } from '../../../../api/bot';
import { returnError } from '../../helpers/returnError';
import { helpers } from '../helpers';

export function app() {
	bot.command('app', async (ctx) => {
		try {
			const messageId = ctx.msg.message_id;
			await helpers.sendMessageHTML(
				ctx,
				'<a href="https://docs.rs.school/#/code-of-conduct">Додаток школи</a>',
			);
			await helpers.removeMessageById({ ctx, messageId });
		} catch (error) { returnError(error); }
	});
}
