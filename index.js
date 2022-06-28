// >----------------------------------------------------------------<
// >                            REQUIRE                             <
// >----------------------------------------------------------------<

import { Telegraf } from 'telegraf';

// import 'dotenv/config.js';

import 'dotenv/config';

// import constants from './scripts/data/constants';
// import { notionRequest } from './scripts/data/notionAPI.js';

import { c, APP, notionAPI } from './scripts/_g.js';





// // import c from './scripts/commands/_c';


const { log } = console;

// >----------------------------------------------------------------<
// >                           TELEGRAF                             <
// >----------------------------------------------------------------<

const bot = new Telegraf(process.env.BOT_TOKEN);
APP.BOT = bot;


// >----------------------------------------------------------------<
// >                              RUN                               <
// >----------------------------------------------------------------<


notionAPI.notionRequest();

// TODO: Refacto two functions below but disable for this bot
// c.botCommandNewChatMembers(bot) // remove service add message
// c.botCommandLeftChatMember() // remove service removed left message

c.botHelp();
c.botCommandSimple();

c.botCommandReply();
c.botCommandRp();
c.botCommandTwo();
c.botCommandRandom();
c.botCommandInfolog();

c.botCommandChannelPost();
c.botCommandChatMember();
// c.botCommandBanpoll(); // TODO: Rewrite to ban with mute no anonymous

c.botCommandAdmins();
c.botCommandTest();
c.botCommandInfo(); // get info from reply to log
c.botCommandMute();
c.botCommandUnmute();


log('script loaded...');


// >----------------------------------------------------------------<
// >                             LAUNCH                             <
// >----------------------------------------------------------------<

bot.launch({
	allowedUpdates:[
		'message', 'edited_message', 'channel_post',
		'edited_channel_post', 'inline_query', 'chosen_inline_result',
		'callback_query', 'shipping_query', 'pre_checkout_query',
		'poll', 'poll_answer', 'my_chat_member', 'chat_member', 'chat_join_request']
});
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
