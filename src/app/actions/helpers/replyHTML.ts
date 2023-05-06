import type { Message } from 'grammy/types';

import type { Ctx } from '../../types/Ctx';
import { helpers } from '.';

export async function replyHTML(
	ctx: Ctx,
	text: string,
	mode: 'mention' | '',
	replyMessageId?: number,
	params: Record<string, string> = {},
): Promise<Message.TextMessage> {
	const replyResponse = await helpers.reply(
		ctx,
		text,
		mode,
		replyMessageId,
		{
			parse_mode: 'HTML',
			...params,
		},
	);

	return replyResponse;
}
