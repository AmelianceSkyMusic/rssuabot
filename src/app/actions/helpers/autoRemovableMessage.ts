import type { CommandContext, Context } from 'grammy';

import { bot } from '~/index';

import { generateFullName } from './generateFullName';
import { generateUserTag } from './generateUserTag';
import removeMsgById from './removeMessageById';

interface AutoRemovableMessage {
	ctx: CommandContext<Context>;
	text: string;
	reply?: boolean;
	ms?: number;
}

export async function autoRemovableMessage({
	ctx,
	text,
	reply = false,
	ms = 3600,
}: AutoRemovableMessage) {
	const chatId = ctx.chat.id;
	const messageId = ctx.msg.message_id;
	const messageUserId = ctx.msg.from?.id;
	const messageUserFirstName = ctx.msg.from?.first_name || '';
	const messageUserLastName = ctx.msg.from?.last_name || '';
	const messageUserFullNameName = generateFullName(
		messageUserFirstName,
		messageUserLastName,
	);

	const messageUserTag = generateUserTag(messageUserId || '', messageUserFullNameName);

	let sendMessage = null;

	if (reply) {
		await ctx.reply(
			`${messageUserTag}, ${text}`,
			{
				reply_to_message_id: messageId,
				parse_mode: 'HTML',
			},
		);
	} else {
		sendMessage = await bot.api.sendMessage(
			chatId,
			text,
			{ parse_mode: 'HTML' },
		);
	}

	if (sendMessage) await removeMsgById(ctx, sendMessage.message_id, ms);
}
