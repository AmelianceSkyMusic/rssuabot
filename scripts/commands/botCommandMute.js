// >----------------------------------------------------------------<
// >                            MODULES                             <
// >----------------------------------------------------------------<

import { f, asm, APP } from '../_g.js';


const { log } = console;




// >----------------------------------------------------------------<
// >                           FUNCTIONS                            <
// >----------------------------------------------------------------<

export default function botCommandMute() {
	APP.BOT.command('mute', async (ctx) => {
		try {
			log(ctx.update.message.text.split('@')[0]);

			await f.ctxRemoveCommandMsg(ctx, 0);

			if (f.isReply(ctx)) {

				const chatId = ctx.update.message.chat.id;

				// *----- from user -----
				const {
					userId,
					userFirstName,
					userUsername,
					userMentionHTML,
					userStatus
				} = f.getUserInfo(ctx);

				// *----- reply to -----
				const {
					replyId,
					replyFirstName,
					replyUsername,
					replyMentionHTML,
					replyStatus
				} = f.getUserInfo(ctx);

				// *----- detect if user has access -----
				if (userStatus === 'creator' || userStatus === 'administrator') {
					if (replyStatus !== 'creator' && replyStatus !== 'administrator') {
						await ctx.telegram.restrictChatMember(chatId, replyId);
						await ctx.replyWithHTML(`${userMentionHTML} зам'ютив ${replyMentionHTML}`);
						log(`\n-\n${userFirstName} @${userUsername} ${userId} (${userStatus})\n→ mute →\n${replyFirstName} @${replyUsername} ${replyId} (${replyStatus})\n-\n`);
					} else {
						await ctx.replyWithHTML(`${userMentionHTML} спробував зам'ютити ${replyMentionHTML}, але нічого не вийшло ¯\\_(ツ)_/¯`);
						log(`\n-\n${userFirstName} @${userUsername} ${userId} (${userStatus})\n→ tried to mute →\n${replyFirstName} @${replyUsername} ${replyId} (${replyStatus})\n-\n`);
					}
				} else {
					await ctx.replyWithHTML(`${userMentionHTML} спробував зам'ютити ${replyMentionHTML}, але нічого не вийшло ¯\\_(ツ)_/¯`);
					log(`\n-\n${userFirstName} @${userUsername} ${userId} (${userStatus})\n→ tried to mute →\n${replyFirstName} @${replyUsername} ${replyId} (${replyStatus})\n-\n`);
				}
			} else {
				f.sendMsgReplyNotFonud(ctx, botCommandMute, 5);
			}
		} catch (error) {
			f.error(botCommandMute, error);
		}
	});
}
