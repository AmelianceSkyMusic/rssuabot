// >----------------------------------------------------------------<
// >                            REQUIRE                             <
// >----------------------------------------------------------------<

const { Telegraf, Markup, Telegram } = require('telegraf')
require('dotenv').config()

const { log } = require('console');

const asm = require('./scripts/modules/asm.js');
const constants = require('./constants');
const debug = require('./helpers');

const https = require('https')

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
		} catch (error) { console.error(error); }
	})
}

const BOT = {};
BOT.users = {};
BOT.inlineKeyboards = {};

bot.on('chat_member', async(ctx) => {


	try {
		const newChatMemberStatus = ctx.update.chat_member.new_chat_member.status
		const newChatMember = ctx.update.chat_member.new_chat_member.user;
		const newChatMemberId = newChatMember.id
		const newChatMemberfirstName = newChatMember.first_name
		const user = `<a href="tg://user?id=${newChatMemberId}">${newChatMemberfirstName}</a>`
		// if (newChatMemberStatus === 'member') {
			BOT.users[newChatMemberId] = {};
					// 		const newChatMember = ctx.message.new_chat_participant;
			// chatId = ctx.message.chat.id;
			// log(ctx.message.chat.id)
			// ctx.restrictChatMember(newChatMemberId, chatId {permissions: false});
			// log(ctx)

			const msg = await ctx.replyWithPhoto({ source: './assets/img/rssstandwithukraine.png' },
				{ caption:
					`<b>${user}, раді вітати тебе українською мовою!</b>\n\n` +
					`❗Поводься чемно, дотримуйся <a href='https://docs.rs.school/#/code-of-conduct'>правил поведінки</a>.\n\n`+
					`Ознайомся, будь ласка, з закріпленими повідомленнями, та <tg-spoiler>тицяй кнопку👇</tg-spoiler>!`,
					parse_mode: 'HTML',
					...Markup.inlineKeyboard([
						// [Markup.urlButton('github', 'https://github.com/AmelianceSkyMusic')],
						[Markup.button.callback('Гайда спілкуватися!', 'btn_readall')],
				])});
				BOT.users[newChatMemberId].messageToRemove = []
				BOT.users[newChatMemberId].messageToRemove.push(msg.message_id);
				log(BOT.users)

			setTimeout( async () => { // remove message after 10 minutes
				try {
					await ctx.deleteMessage(msg.message_id);
				} catch (error) { log(`ASM: Maybe message was removed by the user\n${error}`) }
			}, asm.minToMs(360));
		// } else if (newChatMemberStatus === 'left' || newChatMemberStatus === 'kicked') {
		// 	log(`${user} was ${newChatMemberStatus}`)
		// }



	} catch (error) {
		console.error(`ASM: Maybe message was removed by the user\n${error}`)
	}
})


// ^------------------------ add button ------------------------

addButtonActon('btn_readall', async (ctx) => {
	const messageForFirstName = ctx.update.callback_query.message.caption.split(',')[0]
	const memberPressed = ctx.update.callback_query.from;
	const userId = memberPressed.id
	const firstName = memberPressed.first_name
	const user = `<a href="tg://user?id=${userId}">${firstName}</a>`
	// *----- add wrong user message -----
	if (firstName !== messageForFirstName) {
	// if ( !BOT.users[userId] ) {
		const randomNum = asm.getRandomNumber(0, constants.inlineNoUserMessages.length - 1);
		const randomMsg = await ctx.replyWithHTML(`${user}${constants.inlineNoUserMessages[randomNum]}`);
		// log(randomMsg)
		setTimeout( async () => { // remove messages
			try {
				await ctx.deleteMessage(randomMsg.message_id);
			} catch (error) { log(`ASM: Maybe message was removed by the user\n${error}`) }
		}, asm.minToMs(1));
		await ctx.answerCbQuery()
	} else {
		// *----- add message -----
		try {
			const msg = await ctx.replyWithHTML(`${user}, ану кажи паляниця!😠`)
			BOT.users[userId].messageToRemove.push(msg.message_id);

			setTimeout( async () => { // remove message after 10 minutes
				const msg = await ctx.replyWithHTML('Жартую, заходь!😊')
				BOT.users[userId].messageToRemove.push(msg.message_id);
				setTimeout( async () => { // remove messages
					try {
						for await (const msgId of BOT.users[userId].messageToRemove) {
							await ctx.deleteMessage(msgId);
						}
						delete BOT.users[userId]
					} catch (error) { log(`ASM: Maybe messages from array was removed by the user\n${error}`) }
				}, asm.secToMs(5));
			}, asm.secToMs(3));
			await ctx.answerCbQuery()
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
	try {
		const commandMessageId = ctx.update.message.message_id;
		await removeMsgById.call(ctx, commandMessageId, 5);
		await ctx.replyWithHTML('@AmelianceSkyMusic')
	} catch (error) { console.error(error);}
})


// addBotCommand.call(ctx, 'app', 'https://docs.rs.school/#/code-of-conduct', 'Додаток школи');

bot.command('app', async (ctx) => {
	try {
		const commandMessageId = ctx.update.message.message_id;
		await removeMsgById.call(ctx, commandMessageId, 60000);
		await ctx.replyWithHTML('<a href="https://docs.rs.school/#/code-of-conduct">Додаток школи</a>')
	} catch (error) { console.error(error);}
})
bot.command('coursejsfe', async (ctx) => {
	try {
		const commandMessageId = ctx.update.message.message_id;
		await removeMsgById.call(ctx, commandMessageId, 60000);
		await ctx.replyWithHTML('<a href="https://github.com/rolling-scopes-school/tasks">Про курс</a>')
	} catch (error) { console.error(error);}
})
bot.command('roadmap', async (ctx) => {
	try {
		const commandMessageId = ctx.update.message.message_id;
		await removeMsgById.call(ctx, commandMessageId, 60000);
		await ctx.replyWithHTML('<a href="https://github.com/rolling-scopes-school/tasks/blob/master/roadmap.md">Програма навчання</a>')
	} catch (error) { console.error(error);}
})
bot.command('docs', async (ctx) => {
	try {
		const commandMessageId = ctx.update.message.message_id;
		await removeMsgById.call(ctx, commandMessageId, 60000);
		await ctx.replyWithHTML('<a href="https://docs.rs.school/">Документація</a>')
	} catch (error) { console.error(error);}
})
bot.command('dismission', async (ctx) => {
	try {
		const commandMessageId = ctx.update.message.message_id;
		await removeMsgById.call(ctx, commandMessageId, 60000);
		await ctx.replyWithHTML('<a href="https://docs.rs.school/#/dismission">За що відраховуємо</a>')
	} catch (error) { console.error(error);}
})
bot.command('registration', async (ctx) => {
	try {
		const commandMessageId = ctx.update.message.message_id;
		await removeMsgById.call(ctx, commandMessageId, 60000);
		await ctx.replyWithHTML('<a href="https://app.rs.school/registry/student">Реєстрація</a>')
	} catch (error) { console.error(error);}
})
bot.command('codeofconduct', async (ctx) => {
	try {
		const commandMessageId = ctx.update.message.message_id;
		await removeMsgById.call(ctx, commandMessageId, 60000);
		await ctx.replyWithHTML('<a href="https://docs.rs.school/#/code-of-conduct">Норми поведінки</a>')
	} catch (error) { console.error(error);}
})
bot.command('stickers', async (ctx) => {
	try {
		const commandMessageId = ctx.update.message.message_id;
		await removeMsgById.call(ctx, commandMessageId, 60000);
		await ctx.replyWithHTML('<a href="https://t.me/addstickers/RSSchool_Ukraine">Стікери</a>')
	} catch (error) { console.error(error);}
})

bot.command('reply', async (ctx) => {
	try {
		const commandMessageId = ctx.update.message.message_id;
		await removeMsgById.call(ctx, commandMessageId, 0);

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
			const msg = await ctx.replyWithHTML(`Ця команда працює тільки як Reply!`);
			setTimeout( async () => {
				try {
					await ctx.deleteMessage(msg.message_id);
				} catch (error) { console.error(error); }
			}, asm.secToMs(5));
		}
	} catch (error) {
		console.error(error);
	}
})

bot.command('two', async (ctx) => {
	try {
		const commandMessageId = ctx.update.message.message_id;
		await removeMsgById.call(ctx, commandMessageId, 0);
		const memberPressed = ctx.update.message?.reply_to_message?.from;
		if (memberPressed) {
			const memberPressedId = memberPressed.id;
			const memberPressedfirstName = memberPressed.first_name;
			const user = `<a href="tg://user?id=${memberPressedId}">${memberPressedfirstName}</a>`
			await removeMsgById.call(ctx, commandMessageId, 0);
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
				} catch (error) { console.error(error); }
			}, asm.secToMs(5));
		}

	} catch (error) {
		console.error(error);
	}
})


bot.command('random', async (ctx) => {
	try {
		const commandMessageId = ctx.update.message.message_id;
		const memberPressed = ctx.update.message.from;
		const memberPressedId = memberPressed.id
		const memberPressedfirstName = memberPressed.first_name
		const user = `<a href="tg://user?id=${memberPressedId}">${memberPressedfirstName}</a>`
		await removeMsgById.call(ctx, commandMessageId, 30);
		const randomNum = asm.getRandomNumber(0, constants.randomPhrases.length - 1);
		const randomMsg = await ctx.replyWithHTML(`${user}${constants.randomPhrases[randomNum]}`);
		setTimeout( async () => { // remove messages
			try {
				await ctx.deleteMessage(randomMsg.message_id);
			} catch (error) { log(`ASM: Maybe message was removed by the user\n${error}`) }
		}, asm.secToMs(60));
	} catch (error) { console.error(error);}
})

bot.command('banpoll', async (ctx) => {
	try {
		const commandMessageId = ctx.update.message.message_id;
		await removeMsgById.call(ctx, commandMessageId, 1);

		const memberToBan = ctx.update.message?.reply_to_message?.from;
		log(memberToBan)
		if (memberToBan) {
			const memberPressed = ctx.update.message?.from
			const memberPressedId = memberPressed.id
			const memberPressedfirstName = memberPressed.first_name
			const user = `<a href="tg://user?id=${memberPressedId}">${memberPressedfirstName}</a>`

			const memberToBanId = memberToBan.id
			const memberToBanfirstName = memberToBan.first_name
			const userToBan = `<a href="tg://user?id=${memberToBanId}">${memberToBanfirstName}</a>`
			const msg = await ctx.replyWithPhoto({ source: './assets/img/rssuabot-ban.png' },
			{ caption:
				`${user} пропонує забанити ${userToBan}\n` +
				`Ви підтримуєте ви його пропозицію?🤔`,
				parse_mode: 'HTML',
				...Markup.inlineKeyboard([
					Markup.button.callback(`👍 0`, 'btn_banpoll_like'),
					Markup.button.callback(`👎 0`, 'btn_banpoll_dislike')
			])});
		} else {
			const msg = await ctx.replyWithHTML(`Ця команда працює тільки як Reply!`);
			setTimeout( async () => {
				try {
					await ctx.deleteMessage(msg.message_id);
				} catch (error) { console.error(error); }
			}, asm.secToMs(5));
		}

	} catch (error) {
		console.error(error);
	}
})

bot.command('banpollanonymous', async (ctx) => {
	try {
		const commandMessageId = ctx.update.message.message_id;
		await removeMsgById.call(ctx, commandMessageId, 0);

		const memberToBan = ctx.update.message?.reply_to_message?.from;
		if (memberToBan) {
			const memberToBanId = memberToBan.id
			const memberToBanfirstName = memberToBan.first_name
			const userToBan = `<a href="tg://user?id=${memberToBanId}">${memberToBanfirstName}</a>`
			const msg = await ctx.replyWithPhoto({ source: './assets/img/rssuabot-ban.png' },
			{ caption:
				`👉 ${userToBan} 👈 підозрілий тип, чи не так?🤨\n` +
				`Може тра його забанити?🤔`,
				parse_mode: 'HTML',
				...Markup.inlineKeyboard([
					Markup.button.callback(`👍`, 'btn_banpoll_like'),
					Markup.button.callback(`👎`, 'btn_banpoll_dislike')
			])});
		} else {
			const msg = await ctx.replyWithHTML(`Ця команда працює тільки як Reply!`);
			setTimeout( async () => {
				try {
					await ctx.deleteMessage(msg.message_id);
				} catch (error) { console.error(error); }
			}, asm.secToMs(5));
		}
	} catch (error) {
		console.error(error);
	}
})

bot.command('asmban', async (ctx) => {

})

addButtonActon('btn_banpoll_like', async (ctx) => {
	try {
		const msgId = ctx.update.callback_query.message.message_id
		const userClickedId = ctx.update.callback_query.from.id
		const uniqID = msgId + userClickedId + ''
		log(uniqID)
		if (!BOT.inlineKeyboards[uniqID]) {
			BOT.inlineKeyboards[uniqID] = {}
		}

		let btnLabelLike = ctx.update.callback_query.message.reply_markup.inline_keyboard[0][0].text.slice(2);
		let btnLabelDislike = ctx.update.callback_query.message.reply_markup.inline_keyboard[0][1].text.slice(2);

		if (!BOT.inlineKeyboards[uniqID].choice) {
			BOT.inlineKeyboards[uniqID] = { choice: 'yes', msgId: msgId }
			btnLabelLike = +btnLabelLike + 1;
		} else if (BOT.inlineKeyboards[uniqID].choice === 'no') {
			BOT.inlineKeyboards[uniqID] = { choice: 'yes', msgId: msgId }
			btnLabelLike = +btnLabelLike + 1;
			btnLabelDislike = +btnLabelDislike - 1;
		} else {
			log(BOT.inlineKeyboards[uniqID])
			await ctx.answerCbQuery();
			return
		}

		await ctx.editMessageReplyMarkup({
			inline_keyboard: [
				[
					Markup.button.callback(`👍 ${btnLabelLike}`, 'btn_banpoll_like'),
					Markup.button.callback(`👎 ${btnLabelDislike}`, 'btn_banpoll_dislike')
				]
			]
		})
		await ctx.answerCbQuery('👍');
		log(BOT.inlineKeyboards[uniqID])
	} catch (error) {
		log(error);
	}
})

addButtonActon('btn_banpoll_dislike', async (ctx) => {
	try {
		const msgId = ctx.update.callback_query.message.message_id
		const userClickedId = ctx.update.callback_query.from.id
		const uniqID = msgId + userClickedId + ''
		log(uniqID)
		if (!BOT.inlineKeyboards[uniqID]) {
			BOT.inlineKeyboards[uniqID] = {}
		}

		let btnLabelLike = ctx.update.callback_query.message.reply_markup.inline_keyboard[0][0].text.slice(2);
		let btnLabelDislike = ctx.update.callback_query.message.reply_markup.inline_keyboard[0][1].text.slice(2);

		if (!BOT.inlineKeyboards[uniqID].choice) {
			BOT.inlineKeyboards[uniqID] = { choice: 'no', msgId: msgId }
			btnLabelDislike = +btnLabelDislike + 1;
		} else if (BOT.inlineKeyboards[uniqID].choice === 'yes') {
			BOT.inlineKeyboards[uniqID] = { choice: 'no', msgId: msgId }
			btnLabelDislike = +btnLabelDislike + 1;
			btnLabelLike = +btnLabelLike - 1;
		} else {
			log(BOT.inlineKeyboards[uniqID])
			await ctx.answerCbQuery();
			return
		}

		await ctx.editMessageReplyMarkup({
			inline_keyboard: [
				[
					Markup.button.callback(`👍 ${btnLabelLike}`, 'btn_banpoll_like'),
					Markup.button.callback(`👎 ${btnLabelDislike}`, 'btn_banpoll_dislike')
				]
			]
		})
		log(BOT.inlineKeyboards[uniqID])
		await ctx.answerCbQuery('👎');
	} catch (error) {
		log(error);
	}

})


// ^------------------------ Call All Admins ------------------------

bot.command('admins', async (ctx) => {
	try {
		const botName = ctx.botInfo.first_name
		const chatId = ctx.update.message.chat.id;
		const admins = await ctx.getChatAdministrators(chatId);
		const adminNames = []
		for await (const admin of admins) {
			const adminName = admin.user.first_name
			if (adminName !== botName) {
				const adminId = admin.user.id
				adminNames.push(`<a href="tg://user?id=${adminId}">${adminName}</a>`)
			}
		}
		const randomMsg = await ctx.replyWithHTML(adminNames.join(' '));
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

// ^------------------------ Test ------------------------

bot.command('sendtest', async (ctx) => {
	const chatId = ctx.update.message.chat.id
	const randomMsg = await ctx.replyWithHTML(`chat.id: ${chatId}`)
// 	const url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/getUpdates`;
// 	https.get(url, res => {
// 		let data = '';
// 		res.on('data', chunk => {
// 			data += chunk;
// 		});
// 		res.on('end', () => {
// 			data = JSON.parse(data);
// 			console.log(data);
// 			ctx.replyWithHTML(debug(data))
// 		})
// 	}).on('error', err => {
// 		console.log(err.message);
// 	})
})

bot.on("channel_post", async (ctx) => {
const post = `
Mon, Jun 13, 2022 7:21 AM
 *WiiJoy* said in channel *announcements\\-2022q1* that

Всем привет!

**Сегодня последний день выполнения задания** <#983335939118071828>!
Если вы еще не отправили свои мемчики, или до сих пор не оценили уже присланные \\- самое время этим заняться 😉

И не забудьте поддержать понравившиеся мемы лайком 👍

Наполняемся хорошим настроением перед стартом **Stage#2**!

Успехов!🧙‍♂️`

	const channelUsername = ctx.update.channel_post.sender_chat.username
	const channelPost = ctx.update.channel_post.text
	const chatId = -1001799287707
	log(channelUsername, channelPost)
	if(channelUsername === 'DesignIs_Official') {
		await ctx.telegram.sendMessage(chatId, post)
		// const msg = await ctx.replyWithPhoto({ source: './assets/img/rssuabot-ban.png' },
		// { caption:
		// 	post,
		// 	// parse_mode: 'HTML'
		// });
	}

})

bot.command('ctx', async (ctx) => await ctx.replyWithHTML(`<code>${debug(ctx.update)}</code>`))
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
