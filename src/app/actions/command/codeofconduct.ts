import { bot } from '../../../../api/bot';
import { returnError } from '../../helpers/returnError';
import { helpers } from '../helpers';

export function codeofconduct() {
	bot.command('codeofconduct', async (ctx) => {
		try {
			const messageId = ctx.msg.message_id;
			await helpers.sendMessageHTML(
				ctx,
				'<a href="https://docs.rs.school/#/code-of-conduct">Норми поведінки</a>',
			);
			await helpers.removeMessageById({ ctx, messageId });
		} catch (error) { returnError(error); }
	});
}
