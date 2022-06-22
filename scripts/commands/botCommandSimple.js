// >----------------------------------------------------------------<
// >                            REQUIRE                             <
// >----------------------------------------------------------------<

const asm = require('../modules/_asm');
const f = require('../functions/_f');



// >----------------------------------------------------------------<
// >                           FUNCTIONS                            <
// >----------------------------------------------------------------<

module.exports.botCommandSimple = (bot) => {
	bot.command('asm', async (ctx) => {
		try {
			const commandMessageId = ctx.update.message.message_id;
			await f.removeMsgById(ctx, commandMessageId, 5)
			await ctx.deleteMessage(commandMessageId);
			await ctx.replyWithHTML('@AmelianceSkyMusic')
		} catch (error) { console.error('---------\n→ ASM ERR\n↓ ↓ ↓ ↓ ↓\n', error);}
	})

	bot.command('link', async (ctx) => {
		try {
			const commandMessageId = ctx.update.message.message_id;
			await f.removeMsgById(ctx, commandMessageId, asm.secToMs(3600));
			await ctx.replyWithHTML('<a href="https://t.me/RSSchoolUkraine">RS School | Ukraine</a>')
		} catch (error) { console.error('---------\n→ ASM ERR\n↓ ↓ ↓ ↓ ↓\n', error);}
	})
	bot.command('app', async (ctx) => {
		try {
			const commandMessageId = ctx.update.message.message_id;
			await f.removeMsgById(ctx, commandMessageId, asm.secToMs(3600));
			await ctx.replyWithHTML('<a href="https://docs.rs.school/#/code-of-conduct">Додаток школи</a>')
		} catch (error) { console.error('---------\n→ ASM ERR\n↓ ↓ ↓ ↓ ↓\n', error);}
	})
	bot.command('coursejsfe', async (ctx) => {
		try {
			const commandMessageId = ctx.update.message.message_id;
			await f.removeMsgById(ctx, commandMessageId, asm.secToMs(3600));
			await ctx.replyWithHTML('<a href="https://github.com/rolling-scopes-school/tasks">Про курс</a>')
		} catch (error) { console.error('---------\n→ ASM ERR\n↓ ↓ ↓ ↓ ↓\n', error);}
	})
	bot.command('roadmap', async (ctx) => {
		try {
			const commandMessageId = ctx.update.message.message_id;
			await f.removeMsgById(ctx, commandMessageId, asm.secToMs(3600));
			await ctx.replyWithHTML('<a href="https://github.com/rolling-scopes-school/tasks/blob/master/roadmap.md">Програма навчання</a>')
		} catch (error) { console.error('---------\n→ ASM ERR\n↓ ↓ ↓ ↓ ↓\n', error);}
	})
	bot.command('docs', async (ctx) => {
		try {
			const commandMessageId = ctx.update.message.message_id;
			await f.removeMsgById(ctx, commandMessageId, asm.secToMs(3600));
			await ctx.replyWithHTML('<a href="https://docs.rs.school/">Документація</a>')
		} catch (error) { console.error('---------\n→ ASM ERR\n↓ ↓ ↓ ↓ ↓\n', error);}
	})
	bot.command('dismission', async (ctx) => {
		try {
			const commandMessageId = ctx.update.message.message_id;
			await f.removeMsgById(ctx, commandMessageId, asm.secToMs(3600));
			await ctx.replyWithHTML('<a href="https://docs.rs.school/#/dismission">За що відраховуємо</a>')
		} catch (error) { console.error('---------\n→ ASM ERR\n↓ ↓ ↓ ↓ ↓\n', error);}
	})
	bot.command('registration', async (ctx) => {
		try {
			const commandMessageId = ctx.update.message.message_id;
			await f.removeMsgById(ctx, commandMessageId, asm.secToMs(3600));
			await ctx.replyWithHTML('<a href="https://app.rs.school/registry/student">Реєстрація</a>')
		} catch (error) { console.error('---------\n→ ASM ERR\n↓ ↓ ↓ ↓ ↓\n', error);}
	})
	bot.command('codeofconduct', async (ctx) => {
		try {
			const commandMessageId = ctx.update.message.message_id;
			await f.removeMsgById(ctx, commandMessageId, asm.secToMs(3600));
			await ctx.replyWithHTML('<a href="https://docs.rs.school/#/code-of-conduct">Норми поведінки</a>')
		} catch (error) { console.error('---------\n→ ASM ERR\n↓ ↓ ↓ ↓ ↓\n', error);}
	})
	bot.command('stickers', async (ctx) => {
		try {
			const commandMessageId = ctx.update.message.message_id;
			await f.removeMsgById(ctx, commandMessageId, asm.secToMs(3600));
			await ctx.replyWithHTML('<a href="https://t.me/addstickers/RSSchool_Ukraine">Стікери</a>')
		} catch (error) { console.error('---------\n→ ASM ERR\n↓ ↓ ↓ ↓ ↓\n', error);}
	})
};
