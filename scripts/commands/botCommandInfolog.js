// >----------------------------------------------------------------<
// >                            MODULES                             <
// >----------------------------------------------------------------<

import { f, asm, APP } from '../_g.js';


const { log } = console;




// >----------------------------------------------------------------<
// >                           FUNCTIONS                            <
// >----------------------------------------------------------------<

export default function botCommandInfolog() {
	const functionName = 'botCommandInfolog';

	APP.BOT.command('status', async (ctx) => {
		await f.ctxRemoveCommandMsg(ctx, 0);
		try {
			const {
				userStatus,
				replyStatus
			} = await f.getInfo(ctx, 'REPLY');
			const status = replyStatus ? replyStatus : userStatus;
			await ctx.replyWithHTML(`${status}`);
		} catch (error) {
			f.error(functionName, error);
		}
	});

	APP.BOT.command('infolog', async (ctx) => {
		await f.ctxRemoveCommandMsg(ctx, 0);
		try {
			const {
				userId,
				userIsBot,
				userFirstName,
				userUsername,
				userLanguageCode,
				userStatus,
				userText,
				userIsAnonymous,
				replyId,
				replyIsBot,
				replyFirstName,
				replyUsername,
				replyStatus,
				replyText,
				replyIsAnonymous,
			} = await f.getInfo(ctx, 'REPLY');

			log(
				'\n',
				`userId: ${userId}\n`,
				`userIsBot: ${userIsBot}\n`,
				`userFirstName: ${userFirstName}\n`,
				`userUsername: ${userUsername}\n`,
				`userLanguageCode: ${userLanguageCode}\n`,
				`userStatus: ${userStatus}\n`,
				`userText: ${userText}\n`,
				`userIsAnonymous: ${userIsAnonymous}\n`,
				'\n',
				`replyId: ${replyId}\n`,
				`replyIsBot: ${replyIsBot}\n`,
				`replyFirstName: ${replyFirstName}\n`,
				`replyUsername: ${replyUsername}\n`,
				`replyStatus: ${replyStatus}\n`,
				`replyText: ${replyText}\n`,
				`replyIsAnonymous: ${replyIsAnonymous}\n`,
				'\n',
			);
		} catch (error) {
			f.error(functionName, error);
		}
	});
}
