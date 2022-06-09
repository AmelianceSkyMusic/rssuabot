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



// ИНЛАЙН РЕЖИМ

bot.on('inline_query', query => {
	const results = []

	for (let i = 0; i < 5; i++){
			results.push({
					type: 'article',
					id: i.toString(),
					title: 'title' + i,
					input_message_content: {
							message_text: `Article #${i+1}`
					}

			})
	};

	bot.answerInlineQuery(query.id, results, {
			cash_time: 0
	});
});




addButtonActon('btn_github', './assets/img/asm_logo_old.jpg', constants.githubUrl);

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
