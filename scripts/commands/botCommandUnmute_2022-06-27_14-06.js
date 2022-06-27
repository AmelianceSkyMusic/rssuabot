// >----------------------------------------------------------------<
// >                            MODULES                             <
// >----------------------------------------------------------------<

import { f, asm, APP } from '../_g.js';

const { log } = console;




// >----------------------------------------------------------------<
// >                           FUNCTIONS                            <
// >----------------------------------------------------------------<

export default function botCommandUnmute() {
	APP.BOT.command('unmute', async (ctx) => {
		try {

			const commandMessageId = ctx.update.message.message_id;
			await f.removeMsgById(ctx, commandMessageId, 0);

			const replyTo = ctx.update.message?.reply_to_message?.from;
			if (replyTo) {
				const chatId = ctx.update.message.chat.id;

				// *----- action from -----
				const from = ctx.update.message.from;
				const {	id: fromUserId,
					first_name: fromUserFirstName,
					username: fromUserUsername } = from;
				const userFrom = `<a href="tg://user?id=${fromUserId}">${fromUserFirstName}</a>`;
				const fromGetChatMember = await ctx.telegram.getChatMember(chatId, fromUserId);
				const fromMemberStatus = fromGetChatMember.status;

				// *----- reply to user -----
				const {	id: replyToId,
					first_name: replyToFirstName,
					username: replyToUsername } = replyTo;
				const userReplyTo = `<a href="tg://user?id=${replyToId}">${replyToFirstName}</a>`;
				const replyToGetChatMember = await ctx.telegram.getChatMember(chatId, replyToId);
				const replyToStatus = replyToGetChatMember.status;

				// *----- detect if user has access -----
				if (fromMemberStatus === 'creator' || fromMemberStatus === 'administrator') {
					if (replyToStatus !== 'creator' && replyToStatus !== 'administrator') {
						await ctx.telegram.restrictChatMember(chatId, replyToId, { permissions: APP.UNRESTRICT_OPTIONS });
						const randomMsg = await ctx.replyWithHTML(`${userFrom} розм'ютив ${userReplyTo}`);
						log(`\n-\n${fromUserFirstName} @${fromUserUsername} ${fromUserId} (${fromMemberStatus})\n→ unmute →\n${replyToFirstName} @${replyToUsername} ${replyToId} (${replyToStatus})\n-\n`);
					} else {
						const randomMsg = await ctx.replyWithHTML(`${userFrom} спробував розм'ютити ${userReplyTo}, але нічого не вийшло ¯\\_(ツ)_/¯`);
						log(`\n-\n${fromUserFirstName} @${fromUserUsername} ${fromUserId} (${fromMemberStatus})\n→ tried to unmute →\n${replyToFirstName} @${replyToUsername} ${replyToId} (${replyToStatus})\n-\n`);
					}
				} else {
					const randomMsg = await ctx.replyWithHTML(`${userFrom} спробував розм'ютити ${userReplyTo}, але нічого не вийшло ¯\\_(ツ)_/¯`);
					log(`\n-\n${fromUserFirstName} @${fromUserUsername} ${fromUserId} (${fromMemberStatus})\n→ tried to unmute →\n${replyToFirstName} @${replyToUsername} ${replyToId} (${replyToStatus})\n-\n`);
				}
			} else {
				const msg = await ctx.replyWithHTML(`Команда /unmute працює тільки як Reply!`);
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
}
