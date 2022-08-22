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
		const userText = ctx.update.message.text;

		const fromGetChatMember = await ctx.telegram.getChatMember(chatId, userId);
		const userStatus = fromGetChatMember.status;
		const userIsAnonymous = fromGetChatMember.is_anonymous;

		const userDate = new Date(ctx.update.message.date * 1000);

		const YYYY = userDate.getFullYear();
		const MM = userDate.getMonth();
		const DD = userDate.getDate();

		const hh = userDate.getHours();
		const mm = userDate.getMinutes();
		const ss = userDate.getSeconds();
		const userDateShort = `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`;

		return {
			userId,
			userIsBot,
			userFirstName,
			userUsername,
			userLanguageCode,
			userMentionHTML: `<a href="tg://user?id=${userId}">${userFirstName}</a>`,
			userStatus,
			userText,
			userIsAnonymous,
			userDate,
			userDateShort
		};

	} catch (error) {
		f.error('getUserInfo', error);
	}
}
