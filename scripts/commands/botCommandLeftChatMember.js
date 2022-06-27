// >----------------------------------------------------------------<
// >                            MODULES                             <
// >----------------------------------------------------------------<

import { asm, APP } from '../_g.js';




// >----------------------------------------------------------------<
// >                           FUNCTIONS                            <
// >----------------------------------------------------------------<

export default function botCommandLeftChatMember() {

	// ^------------------------ remove service removed left message ------------------------
	APP.BOT.on('left_chat_member', async (ctx) => { // !TODO REFACTOR
		const msg = ctx.update.message;
		setTimeout( async () => {
			try {
				await ctx.deleteMessage(msg.message_id);
			} catch (error) { console.error(`ASM: Maybe service message was removed by the user\n${error}`); }
		}, asm.secToMs(10));
	});
}
