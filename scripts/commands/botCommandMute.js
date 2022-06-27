// >----------------------------------------------------------------<
// >                            MODULES                             <
// >----------------------------------------------------------------<

import { f, APP } from '../_g.js';


const { log } = console;




// >----------------------------------------------------------------<
// >                           FUNCTIONS                            <
// >----------------------------------------------------------------<

export default function botCommandMute() {
	const functionName = 'botCommandMute';
	APP.BOT.command('mute', async (ctx) => {
		try {

			await f.ctxRemoveCommandMsg(ctx, 0);

			if (f.isReply(ctx)) {

				const chatId = ctx.update.message.chat.id;

				// *----- from user -----
				const {
					userMentionHTML,
					userStatus
				} = await f.getUserInfo(ctx);

				// *----- reply to -----
				const {
					replyId,
					replyMentionHTML,
					replyStatus
				} = await f.getReplyInfo(ctx);

				// *----- detect if user has access -----
				if (userStatus === 'creator' || userStatus === 'administrator' &&
					(replyStatus !== 'creator' && replyStatus !== 'administrator')) {

					// *----- detect if reply no admin -----
					if (replyStatus !== 'creator' && replyStatus !== 'administrator') {
						await ctx.telegram.restrictChatMember(chatId, replyId);
						await ctx.replyWithHTML(`${userMentionHTML} зам'ютив ${replyMentionHTML}`);
						f.logsUserReply(ctx, 'mute', 'REPLY');
					} else {
						await ctx.replyWithHTML(`${userMentionHTML} спробував зам'ютити ${replyMentionHTML}, але нічого не вийшло ¯\\_(ツ)_/¯`);
						f.logsUserReply(ctx, 'tried to mute' , 'REPLY');
					}
				}
			} else {
				f.logsUserReply(ctx, 'tryid to mute');
				f.sendMsgReplyNotFonud(ctx, functionName, 5);
			}
		} catch (error) {
			f.error(functionName, error);
		}
	});
}
