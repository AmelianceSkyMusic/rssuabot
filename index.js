const { Telegraf, Markup } = require('telegraf')
require('dotenv').config()

const { log } = require('console');

const constants = require('./constants');

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => {
	ctx.reply(`Welcome, ${ctx.message.from.username ? ctx.message.from.username : 'user'}!`);
	log(ctx.message);
})
bot.help((ctx) => ctx.reply(constants.commands));
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears(['Привіт', 'Hi'], (ctx) => ctx.reply('Ну привіт😅'));
bot.command('asm', async (ctx) => {
	try {
		await ctx.replyWithHTML('<b>Ameliance SkyMusic</b> на зв\'язку', Markup.inlineKeyboard(
			[
				// [Markup.urlButton('github', 'https://github.com/AmelianceSkyMusic')],
				[Markup.button.callback('github', 'btn_github')],
			]
		))
	} catch (error) { console.error(error);}
})

bot.launch()

function addButtonActon(name, src, text) {
	bot.action(name, async (ctx) => {
		try {
			if (src) {
				await ctx.replyWithPhoto({source: src});
			}
			await ctx.replyWithHTML(text)
			await ctx.answerCbQuery()
		} catch (error) { console.error(error); }
	})
}

bot.on('new_chat_member', async(ctx) => {
	try {
		const newChatMember = ctx.message.new_chat_members[0];
		const user = newChatMember.username ? `@${newChatMember.username}` : newChatMember.first_name

		const msg = await ctx.replyWithPhoto({ source: './assets/img/rssstandwithukraine.png' },
		{ caption:
`<b>${user}, раді вітати тебе українською мовою!</b>

Ознайомся, будь ласка, з закріпленими повідомленнями!

Поводся чемно, дотримуйся <a href="">правил поведінки</a> та
<tg-spoiler>не отримаєш бан</tg-spoiler>😊`
	, parse_mode: 'HTML'});

		setTimeout( async () => {
			await ctx.deleteMessage(msg.message_id)
		}, 600000);
	} catch (error) {
		log(error)
	}
})



addButtonActon('btn_github', './assets/img/asm_logo_old.jpg', constants.githubUrl);

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
