// >----------------------------------------------------------------<
// >                            MODULES                             <
// >----------------------------------------------------------------<

import { f, asm, APP } from '../_g.js';


const { log } = console;




// >----------------------------------------------------------------<
// >                           FUNCTIONS                            <
// >----------------------------------------------------------------<

export default function botCommandTest() {
	APP.BOT.command('test', async (ctx) => { log(ctx.update);});

	APP.BOT.command('sendtest', async (ctx) => {
		const chatId = ctx.update.message.chat.id;
		const randomMsg = await ctx.replyWithHTML(`chat.id: ${chatId}`);
	// 	const url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/getUpdates`;
	// 	https.get(url, res => {
	// 		let data = '';
	// 		res.on('data', chunk => {
	// 			data += chunk;
	// 		});
	// 		res.on('end', () => {
	// 			data = JSON.parse(data);
	// 			console.log(data);
	// 			ctx.replyWithHTML(f.debug(data))
	// 		})
	// 	}).on('error', err => {
	// 		console.log(err.message);
	// 	})
	});

	APP.BOT.command('testobj', async (ctx) => {


		try {
			const commandMessageId = ctx.update.message.message_id;

			await f.removeMsgById(ctx, commandMessageId, 30);
			const randomMsg = await ctx.replyWithHTML(`<code>${f.debug(ctx.update)}</code>`);
			setTimeout( async () => { // remove messages
				try {
					await ctx.deleteMessage(randomMsg.message_id);
				} catch (error) { log(`ASM: Maybe message was removed by the user\n${error}`); }
			}, asm.secToMs(600));
		} catch (error) { console.error('---------\n→ ASM ERR\n↓ ↓ ↓ ↓ ↓\n', error);}
	});

}
