import type { Message } from 'grammy/types';

import { bot } from '../../../../api/bot';
import type { Ctx } from '../../types/Ctx';

export async function sendMessage(
	ctx: Ctx,
	text: string,
	params: Record<string, string> = {},
): Promise<Message.TextMessage> {
	const message = await bot.api.sendMessage(
		ctx.chat.id,
		text,
		{ ...params },
	);
	return message;
}
