// >----------------------------------------------------------------<
// >                            MODULES                             <
// >----------------------------------------------------------------<

import { asm, APP } from '../_g.js';

const { log } = console;



// >----------------------------------------------------------------<
// >                           FUNCTIONS                            <
// >----------------------------------------------------------------<

export default function botOnSticker() {

	APP.BOT.on('sticker', async (ctx) => {
		try {
			const randomNumOfWordsCount = asm.getRandomNumber(0, APP.notion.rssuabot.text.length - 1);
			const message = APP.notion.rssuabot.text[randomNumOfWordsCount];

			const randomMsg = await ctx.replyWithHTML(`${message}`);

			setTimeout( async () => { // remove messages
				try {
					await ctx.deleteMessage(randomMsg.message_id);
				} catch (error) { log(`ASM: Maybe message was removed by the user\n${error}`); }
			}, asm.minToMs(1));

		} catch (error) { console.error('---------\n→ ASM ERR\n↓ ↓ ↓ ↓ ↓\n', error);}
	});

	// APP.BOT.on('sticker', async (ctx) => {
	// 	const sticker = constants.emoji[f.getRandomNumber(0, 19)];
	// 	setTimeout(() => {
	// 		ctx.reply(sticker);
	// 	}, 800);
	// });
}
