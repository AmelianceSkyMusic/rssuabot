// >----------------------------------------------------------------<
// >                            MODULES                             <
// >----------------------------------------------------------------<

import { f, asm, APP, constants } from '../_g.js';

const { log } = console;




// >----------------------------------------------------------------<
// >                           FUNCTIONS                            <
// >----------------------------------------------------------------<

export default function botCommandChatMember() {
	// ^------------------------ Detect Entered Leaved Chat Member ------------------------
	APP.BOT.on('chat_member', async(ctx) => {

		//(property) status: "creator" | "administrator" | "member" | "restricted" | "left" | "kicked"
		try {
			const chatId = ctx.update.chat_member.chat.id;
			const newChatMemberStatus = ctx.update.chat_member.new_chat_member.status;
			const oldChatMemberStatus = ctx.update.chat_member.old_chat_member.status;
			const newChatMember = ctx.update.chat_member.new_chat_member.user;
			const newChatMemberId = newChatMember.id;
			const newChatMemberName = newChatMember?.username;
			const newChatMemberfirstName = newChatMember.first_name;
			// ctx.telegram.restrictChatMember(chatId, newChatMemberId)
			// log(`new user - ${newChatMemberfirstName} @${newChatMemberName} is: ${newChatMemberStatus}`)
			const user = `<a href="tg://user?id=${newChatMemberId}">${newChatMemberfirstName}</a>`;
			log(`${newChatMemberfirstName} ${newChatMemberName} <${newChatMemberId}> is ${newChatMemberStatus} / was ${oldChatMemberStatus}`);
			return;
			APP.BOT.command('unmute', async (ctx) => {
				try {
					const commandMessageId = ctx.update.message.message_id;
					await f.removeMsgById(ctx, commandMessageId, 0);

					const memberPressed = ctx.update.message?.reply_to_message?.from;
					if (memberPressed) {
						const chatId = ctx.update.message.chat.id;
						const memberPressedId = memberPressed.id;
						const memberPressedfirstName = memberPressed.first_name;
						ctx.telegram.restrictChatMember(chatId, memberPressedId);
						return;
						const user = `<a href="tg://user?id=${memberPressedId}">${memberPressedfirstName}</a>`;
						const randomNum = asm.getRandomNumber(0, APP.notion.rssuabot.phrases.length - 1);
						const randomMsg = await ctx.replyWithHTML(`${user}, ${APP.notion.rssuabot.phrases[randomNum]}`);
						setTimeout( async () => { // remove messages
							try {
								await ctx.deleteMessage(randomMsg.message_id);
							} catch (error) { log(`ASM: Maybe message was removed by the user\n${error}`); }
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
			});
			// return
			// if (newChatMemberStatus === 'restricted') {
			// 	ctx.telegram.restrictChatMember(chatId, newChatMemberId, {
			// 		permissions: {
			// 		  can_send_messages: false,
			// 		}
			// 	})
			// } else
			if (oldChatMemberStatus === 'restricted' && newChatMemberStatus === 'restricted') {
				ctx.telegram.restrictChatMember(chatId, newChatMemberId, { permissions: APP.UNRESTRICT_OPTIONS });
				// ctx.replyWithHTML(`was ${oldChatMemberStatus} / is ${newChatMemberStatus}`)
				// log(`${newChatMemberfirstName} ${newChatMemberName} <${newChatMemberId}> is ${newChatMemberStatus} / was ${oldChatMemberStatus}`)
			}
			return;
			 if (newChatMemberStatus === 'member' || newChatMemberStatus === 'restricted') {
				// ctx.replyWithHTML(`${newChatMemberStatus}`)
				return;
				// if oldChatMemberStatus
				APP.users[newChatMemberId] = {};
				const msg = await ctx.replyWithPhoto({ source: './assets/img/rssstandwithukraine.png' },
					{ caption:
						`<b>${user}, раді вітати тебе українською мовою!</b>\n\n` +
						`❗Поводься чемно, дотримуйся <a href='https://docs.rs.school/#/code-of-conduct'>правил поведінки</a>.\n\n`+
						`Ознайомся, будь ласка, з закріпленими повідомленнями, та <tg-spoiler>тицяй кнопку👇</tg-spoiler>!`,
					parse_mode: 'HTML',
					...Markup.inlineKeyboard([
						// [Markup.urlButton('github', 'https://github.com/AmelianceSkyMusic')],
						[Markup.button.callback('Зроблено, гайда спілкуватися!😊', 'btn_readall')],
					])});
				APP.users[newChatMemberId].messageToRemove = [];
				APP.users[newChatMemberId].messageToRemove.push(msg.message_id);
				log(APP.users);

				setTimeout( async () => { // remove message after 10 minutes
					try {
						await ctx.deleteMessage(msg.message_id);
					} catch (error) { log(`ASM: Maybe message was removed by the user\n${error}`); }
				}, asm.secToMs(30));
			} else if ((newChatMemberStatus === 'left' || newChatMemberStatus === 'kicked') && chatId === APP.RSSUA_CHAT_ID) {
				log(`${newChatMemberfirstName} ${newChatMemberName} <${newChatMemberId}> was ${newChatMemberStatus}`);
				ctx.replyWithHTML(`Прощавай, ${user}, я буду за тобою сумувати!`);
			}



		} catch (error) {
			console.error(`ASM: Maybe message was removed by the user\n${error}`);
		}
	});


	// ^------------------------ Add Button ------------------------

	f.addButtonActon('btn_readall', async (ctx) => {
		const callbackQuery = ctx.update.callback_query;
		const chatId = callbackQuery.message.chat.id;
		const messageForFirstName = callbackQuery.message.caption.split(',')[0];
		const memberPressed = callbackQuery.from;
		const userId = memberPressed.id;
		const firstName = memberPressed.first_name;
		// const userName = `@${memberPressed.username}`
		const user = `<a href="tg://user?id=${userId}">${firstName}</a>`;
		ctx.telegram.restrictChatMember(chatId, userId, {
			permissions: {
			  can_send_messages: true,
			}
		});
		// *----- add wrong user message -----
		if (firstName !== messageForFirstName) {
		// if ( !APP.users[userId] ) {
			const randomNum = asm.getRandomNumber(0, constants.inlineNoUserMessages.length - 1);
			// const randomMsg = await ctx.replyWithHTML(`${user}${constants.inlineNoUserMessages[randomNum]}`);
			// // log(randomMsg)
			// setTimeout( async () => { // remove messages
			// 	try {
			// 		await ctx.deleteMessage(randomMsg.message_id);
			// 	} catch (error) { log(`ASM: Maybe message was removed by the user\n${error}`) }
			// }, asm.minToMs(1));
			// await ctx.answerCbQuery()
			await ctx.answerCbQuery(`${firstName}${constants.inlineNoUserMessages[randomNum]}`);
		} else {
			// *----- add message -----
			try {
				const msg = await ctx.replyWithHTML(`${user}, ану кажи паляниця!😠`);
				APP.users[userId].messageToRemove.push(msg.message_id);

				setTimeout( async () => { // remove message after 10 minutes
					const msg = await ctx.replyWithHTML('Жартую, заходь!😊');
					APP.users[userId].messageToRemove.push(msg.message_id);
					setTimeout( async () => { // remove messages
						try {
							for await (const msgId of APP.users[userId].messageToRemove) {
								await ctx.deleteMessage(msgId);
							}
							delete APP.users[userId];
						} catch (error) { log(`ASM: Maybe messages from array was removed by the user\n${error}`); }
					}, asm.secToMs(5));
				}, asm.secToMs(3));
				await ctx.answerCbQuery();
			} catch (error) { console.error('---------\n→ ASM ERR\n↓ ↓ ↓ ↓ ↓\n', error); }
		}
	});
}
