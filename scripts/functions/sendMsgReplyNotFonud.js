// >----------------------------------------------------------------<
// >                            MODULES                             <
// >----------------------------------------------------------------<

import { f, asm } from '../_g.js';




// >----------------------------------------------------------------<
// >                           FUNCTIONS                            <
// >----------------------------------------------------------------<

export default async function sendMsgReplyNotFonud(ctx, functionName, sec) {
	const msg = await ctx.replyWithHTML(`Команда ${f.getCommandText(ctx)} працює тільки як Reply!`);
	setTimeout(async () => {
		try {
			await ctx.deleteMessage(msg.message_id);
		} catch (error) { f.error(functionName, error); }
	}, asm.secToMs(sec));
}
