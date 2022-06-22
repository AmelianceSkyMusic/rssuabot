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

module.exports.botCommandTwo = () => {
	APP.BOT.command('two', async (ctx) => {
		try {
			const commandMessageId = ctx.update.message.message_id;
			await f.removeMsgById(ctx, commandMessageId, 0);
			const memberPressed = ctx.update.message?.reply_to_message?.from;
			if (memberPressed) {
				const memberPressedId = memberPressed.id;
				const memberPressedfirstName = memberPressed.first_name;
				const user = `<a href="tg://user?id=${memberPressedId}">${memberPressedfirstName}</a>`
				await f.removeMsgById(ctx, commandMessageId, 0);
				const randomMsg = await ctx.replyWithHTML(`${user} сідай, 2😅`);
				setTimeout( async () => { // remove messages
					try {
						await ctx.deleteMessage(randomMsg.message_id);
					} catch (error) {
						log(`ASM: Maybe message was removed by the user\n${error}`)
					}
				}, asm.minToMs(60));
			} else {
				const msg = await ctx.replyWithHTML(`Ця команда працює тільки як Reply!`);
				setTimeout( async () => {
					try {
						await ctx.deleteMessage(msg.message_id);
					} catch (error) {
						console.error(`---------\n→ ASM ERR → ${this.name} → \n↓ ↓ ↓ ↓ ↓\n`, error);
					}
				}, asm.secToMs(5));
			}

		} catch (error) {
			console.error(`---------\n→ ASM ERR → ${this.name} → \n↓ ↓ ↓ ↓ ↓\n`, error);
		}
	})
};
