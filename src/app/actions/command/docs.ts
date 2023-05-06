import { bot } from '../../../../api/bot';
import { returnError } from '../../helpers/returnError';
import { helpers } from '../helpers';

export function docs() {
	bot.command('docs', async (ctx) => {
		try {
			const messageId = ctx.msg.message_id;
			await helpers.sendMessageHTML(
				ctx,
				'<a href="https://docs.rs.school/">Документація</a>',
			);
			await helpers.removeMessageById({ ctx, messageId });
		} catch (error) { returnError(error); }
	});
}
