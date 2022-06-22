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

module.exports.botCommandLeftChatMember = () => {

	// ^------------------------ remove service removed left message ------------------------
	APP.BOT.on('left_chat_member', async (ctx) => { // !TODO REFACTOR
		const msg = ctx.update.message;
		setTimeout( async () => {
			try {
				await ctx.deleteMessage(msg.message_id);
			} catch (error) { console.error(`ASM: Maybe service message was removed by the user\n${error}`) }
		}, asm.secToMs(10));
	})
};
