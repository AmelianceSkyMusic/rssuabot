// >----------------------------------------------------------------<
// >                            MODULES                             <
// >----------------------------------------------------------------<

import { f } from '../_g.js';




// >----------------------------------------------------------------<
// >                           FUNCTIONS                            <
// >----------------------------------------------------------------<

export default async function logsUserReply(ctx, command, type = '') {
	try {
		const {
			userId,
			userFirstName,
			userUsername,
			userStatus
		} = await f.getUserInfo(ctx);

		let reply = '';

		if (type === 'REPLY') {
			const {
				replyId,
				replyFirstName,
				replyUsername,
				replyStatus
			} = await f.getReplyInfo(ctx);
			reply = `${replyFirstName} @${replyUsername} ${replyId} (${replyStatus})\n`;
		}

		console.log(
			`\n`,
			`↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓`,
			`\n`,
			`ASM LOGS:`,
			`\n`,
			'\n',
			`${userFirstName} @${userUsername} ${userId} (${userStatus})\n`,
			command,
			'\n',
			reply,
			`\n`,
		);
	} catch (error) {
		f.error('logsUserReply', error);
	}
}
