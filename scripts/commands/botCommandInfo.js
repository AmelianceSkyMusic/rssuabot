// >----------------------------------------------------------------<
// >                            REQUIRE                             <
// >----------------------------------------------------------------<

const { log } = require('console');

const asm = require('../modules/_asm');
const f = require('../functions/_f');



// >----------------------------------------------------------------<
// >                           FUNCTIONS                            <
// >----------------------------------------------------------------<

module.exports.botCommandInfo = (bot) => {
	bot.command('info', async (ctx) => {
		log(ctx)
		try {

			const commandMessageId = ctx.update.message.message_id;
			await f.removeMsgById(ctx, commandMessageId, 0)

			const replyTo = ctx.update.message?.reply_to_message?.from;
			if (replyTo) {
				const chatId = ctx.update.message.chat.id
				const from = ctx.update.message.from
				const fromUserId = ctx.update.message.from.id
				const fromUserFirstName = ctx.update.message.from.first_name
				const fromUserUsername = ctx.update.message.from.username
				const fromGetChatMember = await ctx.telegram.getChatMember(chatId, fromUserId)
				const fromMemberStatus = fromGetChatMember.status
				const replyToId = replyTo.id;
				const replyToFirstName = replyTo.first_name;
				const replyToUsername = replyTo.username;
				const getChatMember = await ctx.telegram.getChatMember(chatId, replyToId)
				const replyToStatus = getChatMember.status
				if (fromMemberStatus === 'creator' || fromMemberStatus === 'administrator') {
					if (replyToStatus !== 'creator' && replyToStatus !== 'administrator') {
						log(`\n-\n${fromUserFirstName} @${fromUserUsername} ${fromUserId} (${fromMemberStatus})\n→ got status →\n${replyToFirstName} @${replyToUsername} ${replyToId} (${replyToStatus})\n-\n`)
					} else {
						log(`\n-\n${fromUserFirstName} @${fromUserUsername} ${fromUserId} (${fromMemberStatus})\n→ tried get status →\n${replyToFirstName} @${replyToUsername} ${replyToId} (${replyToStatus})\n-\n`)
					}
				} else {
					log(`\n-\n${fromUserFirstName} @${fromUserUsername} ${fromUserId} (${fromMemberStatus})\n→ tried get status →\n${replyToFirstName} @${replyToUsername} ${replyToId} (${replyToStatus})\n-\n`)
				}
			} else {
				const msg = await ctx.replyWithHTML(`Команда /mute працює тільки як Reply!`);
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