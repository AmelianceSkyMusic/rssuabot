// >----------------------------------------------------------------<
// >                            MODULES                             <
// >----------------------------------------------------------------<

import { APP } from '../_g.js';




// >----------------------------------------------------------------<
// >                           FUNCTIONS                            <
// >----------------------------------------------------------------<

export default function botCommandAdmins() {
	APP.BOT.command('admins', async (ctx) => {
		try {
			const botName = ctx.botInfo.first_name;
			const chatId = ctx.update.message.chat.id;
			const admins = await ctx.getChatAdministrators(chatId);
			const adminNames = [];
			for await (const admin of admins) {
				const adminName = admin.user.first_name;
				if (adminName !== botName) {
					const adminId = admin.user.id;
					adminNames.push(`<a href="tg://user?id=${adminId}">${adminName}</a>`);
				}
			}
			const randomMsg = await ctx.replyWithHTML(adminNames.join(' '));
		} catch (error) { console.error('---------\n→ ASM ERR\n↓ ↓ ↓ ↓ ↓\n', error);}
	});

}
