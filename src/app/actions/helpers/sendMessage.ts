import { bot } from '../../../../api/bot';
import { returnError } from '../../helpers/returnError';
import type { Ctx } from '../../types/Ctx';
import { helpers } from '.';

export async function sendMessage(
	ctx: Ctx,
	text: string,
	mode?: 'mention' | '',
	params: Record<string, string> = {},
) {
	const newText = mode === 'mention'
		? `${helpers.generateUserFullNameTag(ctx)}, ${text}`
		: text;
	try {
		const chatId = ctx.chat?.id;
		if (!chatId) throw new Error('Can\'t find chat');

		const message = await bot.api.sendMessage(
			chatId,
			newText,
			{ ...params },
		);
		if (message) return message;
		throw new Error('Can\'t find message');
	} catch (error) {
		returnError(error);
	}
	return null;
}
