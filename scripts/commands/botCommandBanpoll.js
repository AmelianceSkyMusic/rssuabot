// >----------------------------------------------------------------<
// >                            MODULES                             <
// >----------------------------------------------------------------<

import { f, asm, APP } from '../_g.js';


const { log } = console;




// >----------------------------------------------------------------<
// >                           FUNCTIONS                            <
// >----------------------------------------------------------------<

export default function botCommandBanpoll() {
	APP.BOT.command('banpoll', async (ctx) => {
		try {
			const commandMessageId = ctx.update.message.message_id;
			await f.removeMsgById(ctx, commandMessageId, 1);

			const memberToBan = ctx.update.message?.reply_to_message?.from;
			log(memberToBan);
			if (memberToBan) {
				const memberPressed = ctx.update.message?.from;
				const memberPressedId = memberPressed.id;
				const memberPressedfirstName = memberPressed.first_name;
				const user = `<a href="tg://user?id=${memberPressedId}">${memberPressedfirstName}</a>`;

				const memberToBanId = memberToBan.id;
				const memberToBanfirstName = memberToBan.first_name;
				const userToBan = `<a href="tg://user?id=${memberToBanId}">${memberToBanfirstName}</a>`;
				const msg = await ctx.replyWithPhoto({ source: './assets/img/rssuabot-ban.png' },
					{ caption:
					`${user} пропонує забанити ${userToBan}\n` +
					`Може тра забанити?🤔`,
					parse_mode: 'HTML',
					...Markup.inlineKeyboard([
						Markup.button.callback(`👍 0`, 'btn_banpoll_like'),
						Markup.button.callback(`👎 0`, 'btn_banpoll_dislike')
					])});
			} else {
				const msg = await ctx.replyWithHTML(`Команда /banpoll працює тільки як Reply!`);
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

	APP.BOT.command('banpollanonymous', async (ctx) => {
		try {
			const commandMessageId = ctx.update.message.message_id;
			await f.removeMsgById(ctx, commandMessageId, 0);

			const memberToBan = ctx.update.message?.reply_to_message?.from;
			if (memberToBan) {
				const memberToBanId = memberToBan.id;
				const memberToBanfirstName = memberToBan.first_name;
				const userToBan = `<a href="tg://user?id=${memberToBanId}">${memberToBanfirstName}</a>`;
				const msg = await ctx.replyWithPhoto({ source: './assets/img/rssuabot-ban.png' },
					{ caption:
					`👉 ${userToBan} 👈 підозрілий тип, чи не так?🤨\n` +
					`Може тра забанити?🤔`,
					parse_mode: 'HTML',
					...Markup.inlineKeyboard([
						Markup.button.callback(`👍`, 'btn_banpoll_like'),
						Markup.button.callback(`👎`, 'btn_banpoll_dislike')
					])});
			} else {
				const msg = await ctx.replyWithHTML(`Команда /banpollanonymous працює тільки як Reply!`);
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

	APP.BOT.command('asmban', async (ctx) => {

	});

	f.addButtonActon('btn_banpoll_like', async (ctx) => {
		try {
			const msgId = ctx.update.callback_query.message.message_id;
			const userClickedId = ctx.update.callback_query.from.id;
			const uniqID = msgId + userClickedId + '';
			log(uniqID);
			if (!APP.inlineKeyboards[uniqID]) {
				APP.inlineKeyboards[uniqID] = {};
			}

			let btnLabelLike = ctx.update.callback_query.message.reply_markup.inline_keyboard[0][0].text.slice(2);
			let btnLabelDislike = ctx.update.callback_query.message.reply_markup.inline_keyboard[0][1].text.slice(2);

			if (!APP.inlineKeyboards[uniqID].choice) {
				APP.inlineKeyboards[uniqID] = { choice: 'yes', msgId: msgId };
				btnLabelLike = +btnLabelLike + 1;
			} else if (APP.inlineKeyboards[uniqID].choice === 'no') {
				APP.inlineKeyboards[uniqID] = { choice: 'yes', msgId: msgId };
				btnLabelLike = +btnLabelLike + 1;
				btnLabelDislike = +btnLabelDislike - 1;
			} else {
				log(APP.inlineKeyboards[uniqID]);
				await ctx.answerCbQuery();
				return;
			}

			await ctx.editMessageReplyMarkup({
				inline_keyboard: [
					[
						Markup.button.callback(`👍 ${btnLabelLike}`, 'btn_banpoll_like'),
						Markup.button.callback(`👎 ${btnLabelDislike}`, 'btn_banpoll_dislike')
					]
				]
			});
			await ctx.answerCbQuery('👍');
			log(APP.inlineKeyboards[uniqID]);
		} catch (error) {
			log(error);
		}
	});

	f.addButtonActon('btn_banpoll_dislike', async (ctx) => {
		try {
			const msgId = ctx.update.callback_query.message.message_id;
			const userClickedId = ctx.update.callback_query.from.id;
			const uniqID = msgId + userClickedId + '';
			log(uniqID);
			if (!APP.inlineKeyboards[uniqID]) {
				APP.inlineKeyboards[uniqID] = {};
			}

			let btnLabelLike = ctx.update.callback_query.message.reply_markup.inline_keyboard[0][0].text.slice(2);
			let btnLabelDislike = ctx.update.callback_query.message.reply_markup.inline_keyboard[0][1].text.slice(2);

			if (!APP.inlineKeyboards[uniqID].choice) {
				APP.inlineKeyboards[uniqID] = { choice: 'no', msgId: msgId };
				btnLabelDislike = +btnLabelDislike + 1;
			} else if (APP.inlineKeyboards[uniqID].choice === 'yes') {
				APP.inlineKeyboards[uniqID] = { choice: 'no', msgId: msgId };
				btnLabelDislike = +btnLabelDislike + 1;
				btnLabelLike = +btnLabelLike - 1;
			} else {
				log(APP.inlineKeyboards[uniqID]);
				await ctx.answerCbQuery();
				return;
			}

			await ctx.editMessageReplyMarkup({
				inline_keyboard: [
					[
						Markup.button.callback(`👍 ${btnLabelLike}`, 'btn_banpoll_like'),
						Markup.button.callback(`👎 ${btnLabelDislike}`, 'btn_banpoll_dislike')
					]
				]
			});
			log(APP.inlineKeyboards[uniqID]);
			await ctx.answerCbQuery('👎');
		} catch (error) {
			log(error);
		}

	});
}
