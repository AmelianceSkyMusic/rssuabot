import type { Message } from 'grammy/types';

import type { Ctx } from '../../types/Ctx';
import { helpers } from '.';

export async function reply(
	ctx: Ctx,
	text: string,
	mode?: 'mention' | '',
	replyMessageId?: number,
	params: Record<string, string> = {},
): Promise<Message.TextMessage> {
	const newText = mode === 'mention'
		? `${helpers.generateUserFullNameTag(ctx)}, ${text}`
		: text;

	const newReplyMessageId = replyMessageId || ctx.msg?.message_id;

	const replyResponse = await ctx.reply(
		newText,
		{
			reply_to_message_id: newReplyMessageId,
			...params,
		},
	);

	return replyResponse;
}
