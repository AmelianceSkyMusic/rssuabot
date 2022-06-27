// >----------------------------------------------------------------<
// >                            MODULES                             <
// >----------------------------------------------------------------<

import { Markup } from 'telegraf';
import { f, asm, APP, constants } from '../_g.js';

const { log } = console;




// >----------------------------------------------------------------<
// >                           FUNCTIONS                            <
// >----------------------------------------------------------------<

export default function botCommandChatMember() {
	const functionName = 'botCommand';
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
			const user = `<a href="tg://user?id=${newChatMemberId}">${newChatMemberfirstName}</a>`;
			const logs = `${newChatMemberfirstName} ${newChatMemberName} (${newChatMemberId}) is ${newChatMemberStatus} / was ${oldChatMemberStatus}`;
			log(logs);

			if (newChatMemberStatus === 'member' && oldChatMemberStatus === 'left' ) {
				await ctx.telegram.restrictChatMember(chatId, newChatMemberId);
				const msg = await ctx.replyWithPhoto({ source: './assets/img/rssstandwithukraine.png' },
					{ caption:
					`<b>${user}, раді вітати тебе українською мовою!</b>\n\n` +
					`❗Поводься чемно, дотримуйся <a href='https://docs.rs.school/#/code-of-conduct'>правил поведінки</a>.\n\n`+
					`Ознайомся, будь ласка, з закріпленими повідомленнями, та <tg-spoiler>тицяй кнопку👇</tg-spoiler>!`,
					parse_mode: 'HTML',
					...Markup.inlineKeyboard([
						// [Markup.urlButton('github', 'https://github.com/AmelianceSkyMusic')],
						[Markup.button.callback('Зроблено, гайда спілкуватися!😊', 'btn_approve')],
					])});
			}


		} catch (error) {
			f.error(functionName, error);
		}
	});


	// ^------------------------ Add Button ------------------------

	f.addButtonActon('btn_approve', async (ctx) => {
		const callbackQuery = ctx.update.callback_query;
		const chatId = callbackQuery.message.chat.id;
		const firstNamefromMessage = callbackQuery.message.caption.split(',')[0];
		const memberPressed = callbackQuery.from;
		const userId = memberPressed.id;
		const firstName = memberPressed.first_name;
		const user = `<a href="tg://user?id=${userId}">${firstName}</a>`;
		// *----- add wrong user message -----
		const msgId = ctx.update.callback_query.message.message_id;
		if (firstName !== firstNamefromMessage) {
			const randomNum = asm.getRandomNumber(0, constants.inlineNoUserMessages.length - 1);
			await ctx.answerCbQuery(`${firstName}${constants.inlineNoUserMessages[randomNum]}`);
		} else {
			// *----- add message -----
			try {
				APP.messages[msgId] = [];
				APP.messages[msgId].push(msgId);
				await ctx.telegram.restrictChatMember(chatId, userId, { permissions: APP.UNRESTRICT_OPTIONS });
				const firstMsg = await ctx.replyWithHTML(`${user}, ану кажи паляниця!😠`);
				APP.messages[msgId].push(firstMsg.message_id);

				setTimeout( async () => { // remove message after 10 minutes
					const secondMsg = await ctx.replyWithHTML('Жартую, заходь!😊');
					APP.messages[msgId].push(secondMsg.message_id);
					setTimeout( async () => { // remove messages
						try {
							for await (const messageId of APP.messages[msgId].reverse()) {
								await ctx.deleteMessage(messageId);
							}
							delete APP.messages[msgId];
						} catch (error) { f.error(functionName, error, 'Can\'t remove messages', 'Maybe messages from array was removed by the user'); }
					}, asm.secToMs(5));

				}, asm.secToMs(3));
				await ctx.answerCbQuery();
			} catch (error) { f.error(functionName, error);}
		}
	});
}
