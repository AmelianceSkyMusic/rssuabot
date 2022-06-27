// >----------------------------------------------------------------<
// >                            MODULES                             <
// >----------------------------------------------------------------<

import { asm } from '../_g.js';

const { log } = console;




// >----------------------------------------------------------------<
// >                           FUNCTIONS                            <
// >----------------------------------------------------------------<

export default async function ctxRemoveCurrentMsgById(ctx, sec) {
	const msgId = ctx.update.message.message_id;
	setTimeout( async () => { // remove messages
		try {
			await ctx.deleteMessage(msgId);
			return true;
		} catch (error) {
			log(`ASM: Maybe message ${msgId} was removed by the user\n${error}`); }
	}, asm.secToMs(sec));
}
