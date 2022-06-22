// >----------------------------------------------------------------<
// >                            REQUIRE                             <
// >----------------------------------------------------------------<

const { Telegraf, Markup, Telegram } = require('telegraf')
require('dotenv').config()

const { log } = require('console');

const constants = require('./scripts/data/constants');
const {notionRequest} = require('./scripts/data/notionAPI');

const {APP} = require('./scripts/data/app');
const c = require('./scripts/commands/_c');



// >----------------------------------------------------------------<
// >                           TELEGRAF                             <
// >----------------------------------------------------------------<

const bot = new Telegraf(process.env.BOT_TOKEN)
APP.BOT = bot;


// >----------------------------------------------------------------<
// >                              RUN                               <
// >----------------------------------------------------------------<


notionRequest();

// TODO: Refacto two functions below but disable for this bot
// c.botCommandNewChatMembers(bot) // remove service add message
// c.botCommandLeftChatMember() // remove service removed left message

c.botHelp()
c.botCommandSimple()

c.botCommandReply()
c.botCommandRp()
c.botCommandTwo()
c.botCommandRandom()

c.botCommandChannelPost()
// c.botCommandChatMember()
c.botCommandBanpoll() // TODO: Rewrite to ban with mute no anonymous

c.botCommandAdmins()
c.botCommandTest()
c.botCommandInfo() // get info from reply to log
// c.botCommandUnmute()
// c.botCommandMute()


log('script loaded...')


// >----------------------------------------------------------------<
// >                             LAUNCH                             <
// >----------------------------------------------------------------<

bot.launch({
	allowedUpdates:[
		"message", "edited_message", "channel_post",
		"edited_channel_post", "inline_query", "chosen_inline_result",
		"callback_query", "shipping_query", "pre_checkout_query",
		"poll", "poll_answer", "my_chat_member", "chat_member", "chat_join_request"]
})
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))










// starn code



// bot.start((ctx) => {
// 	ctx.reply(`Welcome, ${ctx.message.from.username ? ctx.message.from.username : 'user'}!`);
// 	log(ctx.message);

// })

// bot.hears(['Привіт', 'Hi', 'Hello'], (ctx) => ctx.reply('Ну привіт😅'));

// async function addBotCommand(command, ...args) {

// 	log(command)
// 	bot.command(command, async () => {
// 		try { await this.replyWithHTML(`<a href="${args[1]}">${args[2]}</a>`) } catch (error) { console.error('---------\n→ ASM ERR\n↓ ↓ ↓ ↓ ↓\n', error);}
// 	})
// 	return
// }







// const { Telegraf } = require('telegraf')

// const bot = new Telegraf('5zzxxxxxxx')

// bot.start((ctx) => ctx.reply('𝙒𝙚𝙡𝙘𝙤𝙢𝙚!. ✍️. \n@TheModeraterBot is the 𝙢𝙤𝙨𝙩 𝙘𝙤𝙢𝙥𝙡𝙚𝙩𝙚 𝙗𝙤𝙩 For being admin in your groups!. Dont have any trusted admin or active admin to manage your  𝙜𝙧𝙤𝙪𝙥? Add me.\n\n👉🏻 I will do works 𝙖𝙪𝙩𝙤𝙢𝙖𝙩𝙞𝙘𝙖𝙡𝙡𝙮 for your groups.')

// bot.on('new_chat_member', ctx => {
// ctx.reply('Verify that you are human ', Markup.inlineKeyboard([
//   Markup.button.callback('2', 'check')
// ]))
//  ctx.restrictChatMember(ctx.message.new_chat_members)
// })

// bot.action('check', (ctx) => {
//   ctx.restrictChatMember(ctx.from.id, unrestrict_options)
// })

// const unrestrict_options = {
//   can_send_messages: true,
//   can_send_media_messages: true,
//   can_send_polls: true,
//   can_invite_users: true,
//   can_send_other_messages: true,
//   can_pin_messages: true,
// }

// })
// })
// bot.launch()
