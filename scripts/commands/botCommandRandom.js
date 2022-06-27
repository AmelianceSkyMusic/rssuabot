// >----------------------------------------------------------------<
// >                            MODULES                             <
// >----------------------------------------------------------------<

import { f, asm, APP, constants } from '../_g.js';

const { log } = console;




// >----------------------------------------------------------------<
// >                           FUNCTIONS                            <
// >----------------------------------------------------------------<

export default function botCommandRandom()  {
	APP.BOT.command('random', async (ctx) => {
		try {
			const commandMessageId = ctx.update.message.message_id;
			const memberPressed = ctx.update.message.from;
			const memberPressedId = memberPressed.id;
			const memberPressedfirstName = memberPressed.first_name;
			const user = `<a href="tg://user?id=${memberPressedId}">${memberPressedfirstName}</a>`;
			await f.removeMsgById(ctx, commandMessageId, 30);
			const randomNum = asm.getRandomNumber(0, constants.randomPhrases.length - 1);
			const randomMsg = await ctx.replyWithHTML(`${user}${constants.randomPhrases[randomNum]}`);
			setTimeout( async () => { // remove messages
				try {
					await ctx.deleteMessage(randomMsg.message_id);
				} catch (error) { log(`ASM: Maybe message was removed by the user\n${error}`); }
			}, asm.secToMs(3600));
		} catch (error) { console.error('---------\n→ ASM ERR\n↓ ↓ ↓ ↓ ↓\n', error);}
	});

}
