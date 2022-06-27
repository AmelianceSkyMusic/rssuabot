// >----------------------------------------------------------------<
// >                            MODULES                             <
// >----------------------------------------------------------------<

import { f } from '../_g.js';




// >----------------------------------------------------------------<
// >                           FUNCTIONS                            <
// >----------------------------------------------------------------<

export default async function getUserInfo(ctx) {


	try {
		const {
			id: userId,
			is_bot: userIsBot,
			first_name: userFirstName,
			username: userUsername,
			language_code: userLanguageCode
		} = ctx.update.message.from;

		const chatId = ctx.update.message.chat.id;

		const fromGetChatMember = await ctx.telegram.getChatMember(chatId, userId);
		const userStatus = fromGetChatMember.status;
		const userIsAnonymous = fromGetChatMember.is_anonymous;

		return {
			userId,
			userIsBot,
			userFirstName,
			userUsername,
			userLanguageCode,
			userMentionHTML: `<a href="tg://user?id=${userId}">${userFirstName}</a>`,
			userStatus,
			userIsAnonymous
		};

	} catch (error) {
		f.error('getUserInfo', error);
	}
}
