import { Bot, webhookCallback } from 'grammy';

// import { actions } from '~app/actions';
import { ENV } from '~constants/ENV';
// import { phrasesStore } from '~store/phrasesStore';

const { BOT_TOKEN } = ENV;
if (!BOT_TOKEN) throw new Error('BOT_TOKEN is not defined');

export const bot = new Bot(BOT_TOKEN);

// phrasesStore.getState().fetchStudentPhrasesData();
// phrasesStore.getState().fetchRandomPhrasesData();
// phrasesStore.getState().fetchRandomClickPhrasesData();
// phrasesStore.getState().fetchChatRepliesData();

// actions.on.sticker();
// actions.command.help();
// actions.command.app();
// actions.command.registration();
// actions.command.aboutjsfecourse();
// actions.command.roadmap();
// actions.command.docs();
// actions.command.dismission();
// actions.command.link();
// actions.command.codeofconduct();
// actions.command.stickers();
// actions.command.topic();
// actions.command.transliterate();

// // hidden commands
// actions.command.asm();
// actions.command.two();
// actions.command.test();
// actions.command.hidden();

console.log('hello');

export default webhookCallback(bot, 'http');
