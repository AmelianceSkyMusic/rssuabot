import { bot } from '../../../../api/bot';
import { returnError } from '../../helpers/returnError';
import type { Ctx } from '../../types/Ctx';

export async function sendMessage(
	ctx: Ctx,
	text: string,
	params: Record<string, string> = {},
) {
	try {
		const chatId = ctx.chat?.id;
		if (!chatId) throw new Error('Can\'t find chat');

		const message = await bot.api.sendMessage(
			chatId,
			text,
			{ ...params },
		);
		if (message) return message;
		throw new Error('Can\'t find message');
	} catch (error) {
		returnError(error);
	}
	return null;
}
