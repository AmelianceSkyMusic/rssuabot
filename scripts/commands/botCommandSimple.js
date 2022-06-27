// >----------------------------------------------------------------<
// >                            MODULES                             <
// >----------------------------------------------------------------<

import { f, asm, APP, constants } from '../_g.js';




// >----------------------------------------------------------------<
// >                           FUNCTIONS                            <
// >----------------------------------------------------------------<

export default function botCommandSimple() {

	APP.BOT.on('sticker', async (ctx) => {
		const sticker = constants.emoji[f.getRandomNumber(0, 19)];
		setTimeout(() => {
			ctx.reply(sticker);
		}, 800);
	});
	APP.BOT.command('asm', async (ctx) => {
		try {
			const commandMessageId = ctx.update.message.message_id;
			await f.removeMsgById(ctx, commandMessageId, 5);
			await ctx.deleteMessage(commandMessageId);
			await ctx.replyWithHTML('@AmelianceSkyMusic');
		} catch (error) { console.error('---------\n→ ASM ERR\n↓ ↓ ↓ ↓ ↓\n', error);}
	});
	APP.BOT.command('link', async (ctx) => {
		try {
			const commandMessageId = ctx.update.message.message_id;
			await f.removeMsgById(ctx, commandMessageId, asm.secToMs(3600));
			await ctx.replyWithHTML('<a href="https://t.me/RSSchoolUkraine">RS School | Ukraine</a>');
		} catch (error) { console.error('---------\n→ ASM ERR\n↓ ↓ ↓ ↓ ↓\n', error);}
	});
	APP.BOT.command('topic', async (ctx) => {
		try {
			const commandMessageId = ctx.update.message.message_id;
			await f.removeMsgById(ctx, commandMessageId, asm.secToMs(3600));
			await ctx.replyWithHTML('<a href="https://t.me/+H1FJHYfK6Fs2ZTIy">RS School | On Topic</a>');
		} catch (error) { console.error('---------\n→ ASM ERR\n↓ ↓ ↓ ↓ ↓\n', error);}
	});
	APP.BOT.command('app', async (ctx) => {
		try {
			const commandMessageId = ctx.update.message.message_id;
			await f.removeMsgById(ctx, commandMessageId, asm.secToMs(3600));
			await ctx.replyWithHTML('<a href="https://docs.rs.school/#/code-of-conduct">Додаток школи</a>');
		} catch (error) { console.error('---------\n→ ASM ERR\n↓ ↓ ↓ ↓ ↓\n', error);}
	});
	APP.BOT.command('coursejsfe', async (ctx) => {
		try {
			const commandMessageId = ctx.update.message.message_id;
			await f.removeMsgById(ctx, commandMessageId, asm.secToMs(3600));
			await ctx.replyWithHTML('<a href="https://github.com/rolling-scopes-school/tasks">Про курс</a>');
		} catch (error) { console.error('---------\n→ ASM ERR\n↓ ↓ ↓ ↓ ↓\n', error);}
	});
	APP.BOT.command('roadmap', async (ctx) => {
		try {
			const commandMessageId = ctx.update.message.message_id;
			await f.removeMsgById(ctx, commandMessageId, asm.secToMs(3600));
			await ctx.replyWithHTML('<a href="https://github.com/rolling-scopes-school/tasks/blob/master/roadmap.md">Програма навчання</a>');
		} catch (error) { console.error('---------\n→ ASM ERR\n↓ ↓ ↓ ↓ ↓\n', error);}
	});
	APP.BOT.command('docs', async (ctx) => {
		try {
			const commandMessageId = ctx.update.message.message_id;
			await f.removeMsgById(ctx, commandMessageId, asm.secToMs(3600));
			await ctx.replyWithHTML('<a href="https://docs.rs.school/">Документація</a>');
		} catch (error) { console.error('---------\n→ ASM ERR\n↓ ↓ ↓ ↓ ↓\n', error);}
	});
	APP.BOT.command('dismission', async (ctx) => {
		try {
			const commandMessageId = ctx.update.message.message_id;
			await f.removeMsgById(ctx, commandMessageId, asm.secToMs(3600));
			await ctx.replyWithHTML('<a href="https://docs.rs.school/#/dismission">За що відраховуємо</a>');
		} catch (error) { console.error('---------\n→ ASM ERR\n↓ ↓ ↓ ↓ ↓\n', error);}
	});
	APP.BOT.command('registration', async (ctx) => {
		try {
			const commandMessageId = ctx.update.message.message_id;
			await f.removeMsgById(ctx, commandMessageId, asm.secToMs(3600));
			await ctx.replyWithHTML('<a href="https://app.rs.school/registry/student">Реєстрація</a>');
		} catch (error) { console.error('---------\n→ ASM ERR\n↓ ↓ ↓ ↓ ↓\n', error);}
	});
	APP.BOT.command('codeofconduct', async (ctx) => {
		try {
			const commandMessageId = ctx.update.message.message_id;
			await f.removeMsgById(ctx, commandMessageId, asm.secToMs(3600));
			await ctx.replyWithHTML('<a href="https://docs.rs.school/#/code-of-conduct">Норми поведінки</a>');
		} catch (error) { console.error('---------\n→ ASM ERR\n↓ ↓ ↓ ↓ ↓\n', error);}
	});
	APP.BOT.command('stickers', async (ctx) => {
		try {
			const commandMessageId = ctx.update.message.message_id;
			await f.removeMsgById(ctx, commandMessageId, asm.secToMs(3600));
			await ctx.replyWithHTML('<a href="https://t.me/addstickers/RSSchool_Ukraine">Стікери</a>');
		} catch (error) { console.error('---------\n→ ASM ERR\n↓ ↓ ↓ ↓ ↓\n', error);}
	});
}
