import { returnError } from '../../helpers/returnError';
import type { Ctx } from '../../types/Ctx';
import { helpers } from '.';

interface AutoRemovableMessage {
	ctx: Ctx;
	text: string;
	reply?: boolean;
	mention?: boolean;
	ms?: number;
}

export async function autoRemovableMessage({
	ctx,
	text,
	reply = false,
	mention = false,
	ms = 3600,
}: AutoRemovableMessage) {
	const messageId = ctx.msg.message_id;

	const messageUserTag = mention ? `${helpers.generateUserFullNameTag(ctx)}, ` : '';

	let sendMessage = null;
	try {
		if (reply) {
			await ctx.reply(
				`${messageUserTag}${text}`,
				{
					reply_to_message_id: messageId,
					parse_mode: 'HTML',
				},
			);
		} else {
			sendMessage = await helpers.sendMessageHTML(
				ctx,
				`${messageUserTag}${text}`,
			);
		}

		if (sendMessage) {
			await helpers.removeMessageById({ ctx, messageId: sendMessage.message_id, ms });
		}
	} catch (error) { returnError(error); }
}
