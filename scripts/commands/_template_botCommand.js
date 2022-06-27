// >----------------------------------------------------------------<
// >                            MODULES                             <
// >----------------------------------------------------------------<

import { Telegraf, Markup, Telegram } from 'telegraf';

// import constants from '../data/constants';
// import APP from '../data/app';
// import asm from '../modules/_asm';
// import f from '../functions/_f';
// import c from '../commands/_c';

import { c, f, asm, APP, constants } from '../_g.js';

const { log } = console;

// >----------------------------------------------------------------<
// >                           FUNCTIONS                            <
// >----------------------------------------------------------------<

export default function botCommand(bot) {
	bot.command('admins', async (ctx) => {
		const functionName = 'botCommand';
		try {
			if (f.isReply(ctx)) {
				return log('hello');
			} else {
				f.logsUserReply(ctx, 'tryid to unmute');
				f.sendMsgReplyNotFonud(ctx, functionName, 5);
			}
		} catch (error) {
			f.error(functionName, error);
		}
	});

}
