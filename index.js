// >----------------------------------------------------------------<
// >                            REQUIRE                             <
// >----------------------------------------------------------------<

const { Telegraf, Markup, Telegram } = require('telegraf')
require('dotenv').config()

const { log } = require('console');

const asm = require('./scripts/modules/asm.js');
const constants = require('./constants');


// >----------------------------------------------------------------<
// >                           Telegraf                             <
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
		} catch (error) { console.error(error); }
	})
}
const BOT = {};
BOT.users = {};
bot.on('chat_member', async(ctx) => {

	const newChatMemberStatus = ctx.update.chat_member.new_chat_member.status

	try {
		const newChatMember = ctx.update.chat_member.new_chat_member.user;
		const user = newChatMember.username ? `@${newChatMember.username}` : newChatMember.first_name
		if (newChatMemberStatus === 'member') {
			const newChatMemberId = newChatMember.id;
			BOT.users[newChatMemberId] = { isInteractionWithReadAllBtn: false };
					// 		const newChatMember = ctx.message.new_chat_participant;
			// chatId = ctx.message.chat.id;
			// log(ctx.message.chat.id)
			// ctx.restrictChatMember(newChatMemberId, chatId {permissions: false});
			// log(ctx)

			const msg = await ctx.replyWithPhoto({ source: './assets/img/rssstandwithukraine.png' },
				{ caption:
					`<b>${user}, раді вітати тебе українською мовою!</b>\n\n` +
					`❗Поводься, чемно, дотримуйся <a href='https://docs.rs.school/#/code-of-conduct'>правил поведінки</a>.\n\n`+
					`Ознайомся, будь ласка, з закріпленими повідомленнями, та <tg-spoiler>тицяй кнопку👇</tg-spoiler>!`,
					parse_mode: 'HTML',
					...Markup.inlineKeyboard([
						// [Markup.urlButton('github', 'https://github.com/AmelianceSkyMusic')],
						[Markup.button.callback('Гайда спілкуватися!', 'btn_readall')],
				])});
				BOT.users[newChatMemberId].messageToRemove = []
				BOT.users[newChatMemberId].messageToRemove.push(msg.message_id);
				log(BOT.users[newChatMemberId])

			setTimeout( async () => { // remove message after 10 minutes
				try {
					await ctx.deleteMessage(msg.message_id);
				} catch (error) { log(`ASM: Maybe message was removed by the user\n${error}`) }
			}, asm.minToMs(360));
		} else if (newChatMemberStatus === 'left' || newChatMemberStatus === 'kicked') {
			log(`${user} was ${newChatMemberStatus}`)
		}



	} catch (error) {
		console.error(`ASM: Maybe message was removed by the user\n${error}`)
	}
})


// ^------------------------ add button ------------------------
addButtonActon('btn_readall', async (ctx) => {

	const memberPressed = ctx.update.callback_query.from;
	const userId = memberPressed.id;
	const user = memberPressed.username ? `@${memberPressed.username}` : memberPressed.first_name

	// *----- add wrong user message -----
	if ( !BOT.users[userId] ) {
		const randomNum = asm.getRandomNumber(0, constants.inlineNoUserMessages.length - 1);
		const randomMsg = await ctx.replyWithHTML(`${user}${constants.inlineNoUserMessages[randomNum]}`);
		log(randomMsg)
		setTimeout( async () => { // remove messages
			try {
				await ctx.deleteMessage(randomMsg.message_id);
			} catch (error) { log(`ASM: Maybe message was removed by the user\n${error}`) }
		}, asm.minToMs(1));
		await ctx.answerCbQuery()
	} else {
		// *----- add message -----
		try {
			if (BOT.users[userId].isInteractionWithReadAllBtn === false) {
				BOT.users[userId].isInteractionWithReadAllBtn = true;
				const msg = await ctx.replyWithHTML(`${user}, ану кажи паляниця!😠`)
				BOT.users[userId].messageToRemove.push(msg.message_id);

				setTimeout( async () => { // remove message after 10 minutes
					const msg = await ctx.replyWithHTML('Жартую, заходь!😊')
					BOT.users[userId].messageToRemove.push(msg.message_id);
					setTimeout( async () => { // remove messages
						try {
							for (const msgId of BOT.users[userId].messageToRemove) {
								await ctx.deleteMessage(msgId);
							}
						} catch (error) { log(`ASM: Maybe messages from array was removed by the user\n${error}`) }
					}, asm.secToMs(5));
				}, asm.secToMs(5));
				await ctx.answerCbQuery()
			}
		} catch (error) { console.error(error); }
	}
})


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
bot.help((ctx) => ctx.reply(constants.commands));
// bot.on('sticker', (ctx) => ctx.reply('👍'));
// bot.hears(['Привіт', 'Hi', 'Hello'], (ctx) => ctx.reply('Ну привіт😅'));

// async function addBotCommand(command, ...args) {

// 	log(command)
// 	bot.command(command, async () => {
// 		try { await this.replyWithHTML(`<a href="${args[1]}">${args[2]}</a>`) } catch (error) { console.error(error);}
// 	})
// 	return
// }

async function removeMsgById(msgId, sec) {
	setTimeout( async () => { // remove messages
		try {
			await this.deleteMessage(msgId);
		} catch (error) {
			log(`ASM: Maybe message ${msgId} was removed by the user\n${error}`) }
	}, asm.secToMs(sec));
}


bot.command('asm', async (ctx) => {
	const commandMessageId = ctx.update.message.message_id;
	try {
		await removeMsgById.call(ctx, commandMessageId, 5);
		await ctx.replyWithHTML('@AmelianceSkyMusic')
	} catch (error) { console.error(error);}
})


// addBotCommand.call(ctx, 'app', 'https://docs.rs.school/#/code-of-conduct', 'Додаток школи');

bot.command('app', async (ctx) => {
	const commandMessageId = ctx.update.message.message_id;
	try {
		await removeMsgById.call(ctx, commandMessageId, 30);
		await ctx.replyWithHTML('<a href="https://docs.rs.school/#/code-of-conduct">Додаток школи</a>')
	} catch (error) { console.error(error);}
})
bot.command('coursejsfe', async (ctx) => {
	const commandMessageId = ctx.update.message.message_id;
	try {
		await removeMsgById.call(ctx, commandMessageId, 30);
		await ctx.replyWithHTML('<a href="https://github.com/rolling-scopes-school/tasks">Про курс</a>')
	} catch (error) { console.error(error);}
})
bot.command('roadmap', async (ctx) => {
	const commandMessageId = ctx.update.message.message_id;
	try {
		await removeMsgById.call(ctx, commandMessageId, 30);
		await ctx.replyWithHTML('<a href="https://github.com/rolling-scopes-school/tasks/blob/master/roadmap.md">Програма навчання:</a>')
	} catch (error) { console.error(error);}
})
bot.command('docs', async (ctx) => {
	const commandMessageId = ctx.update.message.message_id;
	try {
		await removeMsgById.call(ctx, commandMessageId, 30);
		await ctx.replyWithHTML('<a href="https://docs.rs.school/">Документація</a>')
	} catch (error) { console.error(error);}
})
bot.command('dismission', async (ctx) => {
	const commandMessageId = ctx.update.message.message_id;
	try {
		await removeMsgById.call(ctx, commandMessageId, 30);
		await ctx.replyWithHTML('<a href="https://docs.rs.school/#/dismission">За що відраховуємо</a>')
	} catch (error) { console.error(error);}
})
bot.command('registration', async (ctx) => {
	const commandMessageId = ctx.update.message.message_id;
	try {
		await removeMsgById.call(ctx, commandMessageId, 30);
		await ctx.replyWithHTML('<a href="https://app.rs.school/registry/student">Реєстрація</a>')
	} catch (error) { console.error(error);}
})
bot.command('codeofconduct', async (ctx) => {
	const commandMessageId = ctx.update.message.message_id;
	try {
		await removeMsgById.call(ctx, commandMessageId, 30);
		await ctx.replyWithHTML('<a href="https://docs.rs.school/#/code-of-conduct">Норми поведінки</a>')
	} catch (error) { console.error(error);}
})
bot.command('stickers', async (ctx) => {
	const commandMessageId = ctx.update.message.message_id;
	try {
		await removeMsgById.call(ctx, commandMessageId, 30);
		await ctx.replyWithHTML('<a href="https://t.me/addstickers/RSSchool_Ukraine">Стікери</a>')
	} catch (error) { console.error(error);}
})

// bot.command('reply', async (ctx) => {
// 	const commandMessageId = ctx.update.message.message_id;
// 	try {
// 		await removeMsgById.call(ctx, commandMessageId, 30);
// 		await ctx.replyWithHTML('reply')
// 	} catch (error) { console.error(error);}
// })



bot.command('random', async (ctx) => {
	const commandMessageId = ctx.update.message.message_id;
	const memberPressed = ctx.update.message.from;
	const user = memberPressed.username ? `@${memberPressed.username}` : memberPressed.first_name
	try {
		await removeMsgById.call(ctx, commandMessageId, 30);
		const randomNum = asm.getRandomNumber(0, constants.inlineNoUserMessages.length - 1);
		const randomMsg = await ctx.replyWithHTML(`${user}${constants.inlineNoUserMessages[randomNum]}`);
		setTimeout( async () => { // remove messages
			try {
				await ctx.deleteMessage(randomMsg.message_id);
			} catch (error) { log(`ASM: Maybe message was removed by the user\n${error}`) }
		}, asm.secToMs(30));
	} catch (error) { console.error(error);}
})





// function addButtonActon(name, src, text) {
// 	bot.action(name, async (ctx) => {
// 		try {
// 			if (src) {
// 				await ctx.replyWithPhoto({source: src});
// 			}
// 			await ctx.replyWithHTML(text)
// 			await ctx.answerCbQuery()
// 		} catch (error) { console.error(error); }
// 	})
// }


// addButtonActon('btn_github', './assets/img/asm_logo_old.jpg', constants.githubUrl);



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
