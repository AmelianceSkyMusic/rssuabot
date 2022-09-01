// >----------------------------------------------------------------<
// >                            MODULES                             <
// >----------------------------------------------------------------<

import { asm, APP } from '../_g.js';




// >----------------------------------------------------------------<
// >                           FUNCTIONS                            <
// >----------------------------------------------------------------<

export default function botCommandChannelPost() {
	APP.BOT.on('channel_post', async (ctx) => {
		try {
			const channelUsername = ctx.update.channel_post.sender_chat.username;
			const channelPost = ctx.update.channel_post.text;

			if (channelUsername === 'rss_announcements') {
			// if (channelUsername === 'DesignIs_Official') {
				const chatId = APP.RSSUA_ONTOPIC_CHAT_ID;
				// const chatId = APP.TEST_CHAT_ID
				const postArrTemp = channelPost.split('\n');
				const postDate = postArrTemp.shift().replaceAll('*', '').trim();
				const postAuthor = postArrTemp.shift().replaceAll('*', '').slice(0, -5).trim();

				const postArr = [
					...postArrTemp,
					'',
					`\`${postAuthor}\``,
					`\`${postDate}\``
				];

				const post = '#announcement\n\n' + postArr.join('\n').replaceAll('**', '*').replaceAll('__', '_').trim();

				const msg1 = await ctx.telegram.sendMessage(chatId, post, {parse_mode: 'Markdown'});
				const msgId1 = msg1.message_id;
				await ctx.telegram.pinChatMessage(chatId, msgId1, true);
				setTimeout( async () => {
					try {
						await ctx.telegram.unpinChatMessage(chatId, msgId1);
					} catch (error) { console.error('---------\n→ ASM ERR\n↓ ↓ ↓ ↓ ↓\n', error); }

				}, asm.minToMs(720));

				const msg2 = await ctx.telegram.sendMessage(APP.RSSUA_CHAT_ID, post, {parse_mode: 'Markdown'});
				const msgId2 = msg2.message_id;
				await ctx.telegram.pinChatMessage(APP.RSSUA_CHAT_ID, msgId2, true);
				setTimeout( async () => {
					try {
						await ctx.telegram.unpinChatMessage(APP.RSSUA_CHAT_ID, msgId2);
					} catch (error) { console.error('---------\n→ ASM ERR\n↓ ↓ ↓ ↓ ↓\n', error); }

				}, asm.minToMs(720));

				const msg3 = await ctx.telegram.sendMessage(APP.RSSUA_CHAT_ID, post, {parse_mode: 'Markdown'});
				const msgId3 = msg3.message_id;
				await ctx.telegram.pinChatMessage(APP.RSSUA_CHAT_ID, msgId3, true);
				setTimeout( async () => {
					try {
						await ctx.telegram.unpinChatMessage(APP.RSS2022Q1UA_CHAT_ID, msgId3);
					} catch (error) { console.error('---------\n→ ASM ERR\n↓ ↓ ↓ ↓ ↓\n', error); }

				}, asm.minToMs(720));

			} else if(channelUsername === 'DesignIs_Official') { // test
				// const chatId = APP.RSS2022Q1UA_CHAT_ID;
				const chatId = APP.RSSUA_CHAT_ID;
				const channelPost = ctx.update.channel_post.text;
				const msg = await ctx.telegram.sendMessage(chatId, channelPost, {parse_mode: 'Markdown'});
				// const msgId = msg.message_id
				// await ctx.telegram.pinChatMessage(chatId, msgId, true)
				// setTimeout( async () => {
				// 	try {
				// 		await ctx.telegram.unpinChatMessage(chatId, msgId)
				// 	} catch (error) { console.error('---------\n→ ASM ERR\n↓ ↓ ↓ ↓ ↓\n', error); }

				// }, asm.secToMs(10));

			}
		} catch (error) {
			console.error('---------\n→ ASM ERR\n↓ ↓ ↓ ↓ ↓\n', error);
		}


	});
}
