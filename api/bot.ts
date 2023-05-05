import { Bot, webhookCallback } from 'grammy';

const token = process.env.BOT_TOKEN;
if (!token) throw new Error('BOT_TOKEN is unset');

const bot = new Bot(token);

console.log('hello');

export default webhookCallback(bot, 'http');
