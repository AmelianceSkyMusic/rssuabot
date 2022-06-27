// >----------------------------------------------------------------<
// >                            MODULES                             <
// >----------------------------------------------------------------<

import { f } from '../_g.js';




// >----------------------------------------------------------------<
// >                           FUNCTIONS                            <
// >----------------------------------------------------------------<

export default async function getReplyInfo(ctx) {


	try {
		const {
			id: replyId,
			is_bot: replyIsBot,
			first_name: replyFirstName,
			username: replyUsername,
			language_code: replyLanguageCode
		} = ctx.update.message.from;

		const chatId = ctx.update.message.chat.id;

		const fromGetChatMember = await ctx.telegram.getChatMember(chatId, replyId);
		const replyStatus = fromGetChatMember.status;
		const replyIsAnonymous = fromGetChatMember.is_anonymous;

		return {
			replyId,
			replyIsBot,
			replyFirstName,
			replyUsername,
			replyLanguageCode,
			replyMentionHTML: `<a href="tg://user?id=${replyId}">${replyFirstName}</a>`,
			replyStatus,
			replyIsAnonymous
		};

	} catch (error) {
		f.error('getReplyInfo', error);
	}
}
