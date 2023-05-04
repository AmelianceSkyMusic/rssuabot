import type { CommandContext, Context } from 'grammy';

import { bot } from '~/index';

import removeMsgById from './removeMessageById';

export async function autoRemovableMessage(
	ctx: CommandContext<Context>,
	text: string,
	ms = 3600,
) {
	const chatId = ctx.chat.id;

	const sendMessage = await bot.api.sendMessage(
		chatId,
		text,
		{ parse_mode: 'HTML' },
	);

	await removeMsgById(ctx, sendMessage.message_id, ms);
}
