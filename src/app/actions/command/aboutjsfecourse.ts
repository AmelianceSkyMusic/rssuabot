import { bot } from '../../../../api/bot';
import { returnError } from '../../helpers/returnError';
import { helpers } from '../helpers';

export function aboutjsfecourse() {
	bot.command('aboutjsfecourse', async (ctx) => {
		try {
			const messageId = ctx.msg.message_id;
			await bot.api.sendMessage(
				ctx.chat.id,
				'<a href="https://github.com/rolling-scopes-school/tasks#%D0%BA%D1%83%D1%80%D1%81-jsfrontend-%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0">Про курс JS/FE</a>',
				{ parse_mode: 'HTML' },
			);
			await helpers.removeMessageById(ctx, messageId, 3600);
		} catch (error) { returnError(error); }
	});
}
