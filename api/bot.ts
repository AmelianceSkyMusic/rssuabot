import { Bot, webhookCallback } from 'grammy';

import { actions } from '../src/app/actions';
import { phrasesStore } from '../src/app/store/phrasesStore';

import 'dotenv/config';

const { BOT_TOKEN, MODE } = process.env;

phrasesStore.getState().fetchStudentPhrases();
phrasesStore.getState().fetchRandomPhrases();
phrasesStore.getState().fetchRandomClickPhrases();
phrasesStore.getState().fetchChatReplies();
phrasesStore.getState().fetchChosenPhrases();

if (!BOT_TOKEN) throw new Error('BOT_TOKEN is not defined');

export const bot = new Bot(BOT_TOKEN);

// actions.on.sticker();
actions.command.help();
actions.command.app();
actions.command.registration();
actions.command.aboutjsfecourse();
actions.command.roadmap();
actions.command.docs();
actions.command.dismission();
actions.command.link();
actions.command.codeofconduct();
actions.command.stickers();
actions.command.topic();
actions.command.transliterate();
actions.command.set();
actions.command.getphrase();
actions.command.getrandom();

// hidden commands
actions.command.hidden();
actions.command.two();
actions.command.ph();
actions.command.rd();
actions.command.asm();
actions.command.test();
actions.command.store();
actions.command.refetch();

if (MODE === 'dev') bot.start();

export default webhookCallback(bot, 'http');

// eslint-disable-next-line no-console
console.log(`BOT HAS STARTED in "${MODE || 'production'}" MODE`);
