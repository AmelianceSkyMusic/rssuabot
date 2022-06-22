// >----------------------------------------------------------------<
// >                            REQUIRE                             <
// >----------------------------------------------------------------<

const { log } = require('console');
const { Telegraf, Markup, Telegram } = require('telegraf')

const {APP} = require('../data/app');
const asm = require('../modules/_asm');
const f = require('../functions/_f');
const c = require('../commands/_c');



// >----------------------------------------------------------------<
// >                           FUNCTIONS                            <
// >----------------------------------------------------------------<

module.exports.botCommandRp = () => {
	APP.BOT.command('rp', async (ctx) => {
		try {
			const commandMessageId = ctx.update.message.message_id;
			await f.removeMsgById(ctx, commandMessageId, 0);

			const memberPressed = ctx.update.message?.reply_to_message?.from;
			if (memberPressed) {
				const memberPressedId = memberPressed.id;
				const memberPressedfirstName = memberPressed.first_name;
				const user = `<a href="tg://user?id=${memberPressedId}">${memberPressedfirstName}</a>`
				const randomNum = asm.getRandomNumber(0, APP.notion.rssuabot.phrases.length - 1);
				const randomMsg = await ctx.replyWithHTML(`${user}, ${APP.notion.rssuabot.phrases[randomNum]}`);
				setTimeout( async () => { // remove messages
					try {
						await ctx.deleteMessage(randomMsg.message_id);
					} catch (error) { log(`ASM: Maybe message was removed by the user\n${error}`) }
				}, asm.minToMs(60));
			} else {
				const msg = await ctx.replyWithHTML(`Команда /rp працює тільки як Reply!`);
				setTimeout( async () => {
					try {
						await ctx.deleteMessage(msg.message_id);
					} catch (error) { console.error('---------\n→ ASM ERR\n↓ ↓ ↓ ↓ ↓\n', error); }
				}, asm.secToMs(5));
			}
		} catch (error) {
			console.error('---------\n→ ASM ERR\n↓ ↓ ↓ ↓ ↓\n', error);
		}
	})

};
