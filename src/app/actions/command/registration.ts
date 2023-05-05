import { bot } from '../../../../api/bot';
import { returnError } from '../../helpers/returnError';
import { helpers } from '../helpers';

export function registration() {
	bot.command('registration', async (ctx) => {
		try {
			const messageId = ctx.msg.message_id;
			await bot.api.sendMessage(
				ctx.chat.id,
				'<a href="https://app.rs.school/registry/student">Реєстрація</a>',
				{ parse_mode: 'HTML' },
			);
			await helpers.removeMessageById(ctx, messageId, 5600);
		} catch (error) { returnError(error); }
	});
}
