import type { Ctx } from '~types/Ctx';

import { helpers } from '.';

export function generateReplyingUserFullNameTag(ctx: Ctx): string {
	const replyToMessage = ctx.msg.reply_to_message;

	if (replyToMessage) {
		const repliedMessageUserId = replyToMessage.from?.id || '';
		const repliedMessageUserFirstName = replyToMessage.from?.first_name || '';
		const repliedMessageUserLastName = replyToMessage.from?.last_name || '';
		const repliedMessageUserFullName = helpers.generateFullName(
			repliedMessageUserFirstName,
			repliedMessageUserLastName,
		);

		return helpers.generateUserTag(
			repliedMessageUserId,
			repliedMessageUserFullName,
		);
	}
	return '';
}
