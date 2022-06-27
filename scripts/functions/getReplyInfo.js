// >----------------------------------------------------------------<
// >                            MODULES                             <
// >----------------------------------------------------------------<

import { f } from '../_g.js';




// >----------------------------------------------------------------<
// >                           FUNCTIONS                            <
// >----------------------------------------------------------------<

export default async function getReplyInfo(ctx) {
	try {
		const replyTo = ctx.update.message?.reply_to_message?.from;
		if (replyTo) {
			const {
				id: replyId,
				is_bot: replyIsBot,
				first_name: replyFirstName,
				username: replyUsername,
			} = replyTo;

			const chatId = ctx.update.message.reply_to_message.chat.id;
			const replyText = ctx.update.message.reply_to_message.text;

			const fromGetChatMember = await ctx.telegram.getChatMember(chatId, replyId);
			const replyStatus = fromGetChatMember.status;
			const replyIsAnonymous = fromGetChatMember.is_anonymous;

			return {
				replyId,
				replyIsBot,
				replyFirstName,
				replyUsername,
				replyMentionHTML: `<a href="tg://user?id=${replyId}">${replyFirstName}</a>`,
				replyStatus,
				replyText,
				replyIsAnonymous
			};
		} else {
			return;
		}

	} catch (error) {
		f.error('getReplyInfo', error);
	}
}
