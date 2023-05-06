import type { Message } from 'grammy/types';

import type { Ctx } from '../../types/Ctx';
import { sendMessage } from './sendMessage';

export async function sendMessageHTML(
	ctx: Ctx,
	text: string,
): Promise<Message.TextMessage> {
	const message = await sendMessage(
		ctx,
		text,
		{ parse_mode: 'HTML' },
	);
	return message;
}
