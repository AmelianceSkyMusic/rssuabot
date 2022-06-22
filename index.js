// >----------------------------------------------------------------<
// >                            REQUIRE                             <
// >----------------------------------------------------------------<

const { Telegraf, Markup, Telegram } = require('telegraf')
require('dotenv').config()

const { log } = require('console');

const constants = require('./scripts/data/constants');
const {APP} = require('./scripts/data/app');
const {notionRequest} = require('./scripts/data/notionAPI');

const asm = require('./scripts/modules/_asm');
const f = require('./scripts/functions/_f');
const c = require('./scripts/commands/_c');





// >----------------------------------------------------------------<
// >                           CONSTANTS                            <
// >----------------------------------------------------------------<





notionRequest();
// >----------------------------------------------------------------<
// >                           TELEGRAF                             <
// >----------------------------------------------------------------<

const bot = new Telegraf(process.env.BOT_TOKEN)

// >----------------------------------------------------------------<
// >                              CHAT                              <
// >----------------------------------------------------------------<
log('script loaded...')

addButtonActon = (name, callback) => {
	bot.action(name, async (ctx) => {
		try {
			await callback(ctx);
		} catch (error) { console.error('---------\n→ ASM ERR\n↓ ↓ ↓ ↓ ↓\n', error); }
	})
}







// ^------------------------ remove service add message ------------------------
// bot.on('new_chat_members', async (ctx) => {
// 	const msg = ctx.update.message;
// 	setTimeout( async () => {
// 		try {
// 			await ctx.deleteMessage(msg.message_id);
// 		} catch (error) { console.error(`ASM: Maybe service message was removed by the user\n${error}`) }
// 	}, 10000);
// })


// ^------------------------ remove service removed left message ------------------------
bot.on('left_chat_member', async (ctx) => {
	const msg = ctx.update.message;
	setTimeout( async () => {
		try {
			await ctx.deleteMessage(msg.message_id);
		} catch (error) { console.error(`ASM: Maybe service message was removed by the user\n${error}`) }
	}, asm.secToMs(10));
})

// >----------------------------------------------------------------<
// >                              ....                              <
// >----------------------------------------------------------------<
// bot.start((ctx) => {
// 	ctx.reply(`Welcome, ${ctx.message.from.username ? ctx.message.from.username : 'user'}!`);
// 	log(ctx.message);

// })

// bot.on('sticker', (ctx) => ctx.reply('👍'));
// bot.hears(['Привіт', 'Hi', 'Hello'], (ctx) => ctx.reply('Ну привіт😅'));

// async function addBotCommand(command, ...args) {

// 	log(command)
// 	bot.command(command, async () => {
// 		try { await this.replyWithHTML(`<a href="${args[1]}">${args[2]}</a>`) } catch (error) { console.error('---------\n→ ASM ERR\n↓ ↓ ↓ ↓ ↓\n', error);}
// 	})
// 	return
// }



bot.command('reply', async (ctx) => {
	try {
		const commandMessageId = ctx.update.message.message_id;
		await f.removeMsgById(ctx, commandMessageId, 0);

		const memberPressed = ctx.update.message?.reply_to_message?.from;
		if (memberPressed) {
			const memberPressedId = memberPressed.id;
			const memberPressedfirstName = memberPressed.first_name;
			const user = `<a href="tg://user?id=${memberPressedId}">${memberPressedfirstName}</a>`
			const randomNum = asm.getRandomNumber(0, constants.randomPhrases.length - 1);
			const randomMsg = await ctx.replyWithHTML(`${user}${constants.randomPhrases[randomNum]}`);
			setTimeout( async () => { // remove messages
				try {
					await ctx.deleteMessage(randomMsg.message_id);
				} catch (error) { log(`ASM: Maybe message was removed by the user\n${error}`) }
			}, asm.minToMs(60));
		} else {
			const msg = await ctx.replyWithHTML(`Команда /reply працює тільки як Reply!`);
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

bot.command('rp', async (ctx) => {
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
			const msg = await ctx.replyWithHTML(`Команда /reply працює тільки як Reply!`);
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

bot.command('two', async (ctx) => {
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
				} catch (error) { log(`ASM: Maybe message was removed by the user\n${error}`) }
			}, asm.minToMs(60));
		} else {
			const msg = await ctx.replyWithHTML(`Ця команда працює тільки як Reply!`);
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


bot.command('random', async (ctx) => {
	try {
		const commandMessageId = ctx.update.message.message_id;
		const memberPressed = ctx.update.message.from;
		const memberPressedId = memberPressed.id
		const memberPressedfirstName = memberPressed.first_name
		const user = `<a href="tg://user?id=${memberPressedId}">${memberPressedfirstName}</a>`
		await f.removeMsgById(ctx, commandMessageId, 30);
		const randomNum = asm.getRandomNumber(0, constants.randomPhrases.length - 1);
		const randomMsg = await ctx.replyWithHTML(`${user}${constants.randomPhrases[randomNum]}`);
		setTimeout( async () => { // remove messages
			try {
				await ctx.deleteMessage(randomMsg.message_id);
			} catch (error) { log(`ASM: Maybe message was removed by the user\n${error}`) }
		}, asm.secToMs(3600));
	} catch (error) { console.error('---------\n→ ASM ERR\n↓ ↓ ↓ ↓ ↓\n', error);}
})

c.botHelp(bot, constants.commands)
c.botCommandSimple(bot)


c.botCommandChannelPost(bot)
c.botCommandChatMember(bot)
c.botCommandBanpoll(bot)


c.botCommandAdmins(bot)
c.botCommandTest(bot)
c.botCommandInfo(bot)
c.botCommandUnmute(bot)
c.botCommandMute(bot)


// >----------------------------------------------------------------<
// >                             LAUNCH                             <
// >----------------------------------------------------------------<

bot.launch({
	allowedUpdates:[
		"message", "edited_message", "channel_post",
		"edited_channel_post", "inline_query", "chosen_inline_result",
		"callback_query", "shipping_query", "pre_checkout_query",
		"poll", "poll_answer", "my_chat_member", "chat_member", "chat_join_request"]
})
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))


















// const { Telegraf } = require('telegraf')

// const bot = new Telegraf('5zzxxxxxxx')

// bot.start((ctx) => ctx.reply('𝙒𝙚𝙡𝙘𝙤𝙢𝙚!. ✍️. \n@TheModeraterBot is the 𝙢𝙤𝙨𝙩 𝙘𝙤𝙢𝙥𝙡𝙚𝙩𝙚 𝙗𝙤𝙩 For being admin in your groups!. Dont have any trusted admin or active admin to manage your  𝙜𝙧𝙤𝙪𝙥? Add me.\n\n👉🏻 I will do works 𝙖𝙪𝙩𝙤𝙢𝙖𝙩𝙞𝙘𝙖𝙡𝙡𝙮 for your groups.')

// bot.on('new_chat_member', ctx => {
// ctx.reply('Verify that you are human ', Markup.inlineKeyboard([
//   Markup.button.callback('2', 'check')
// ]))
//  ctx.restrictChatMember(ctx.message.new_chat_members)
// })

// bot.action('check', (ctx) => {
//   ctx.restrictChatMember(ctx.from.id, unrestrict_options)
// })

// const unrestrict_options = {
//   can_send_messages: true,
//   can_send_media_messages: true,
//   can_send_polls: true,
//   can_invite_users: true,
//   can_send_other_messages: true,
//   can_pin_messages: true,
// }

// })
// })
// bot.launch()
