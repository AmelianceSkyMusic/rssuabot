import APP from '../data/app.js';

// const {APP} = require('../data/app').default;
// const asm = require('../modules/_asm');
// const f = require('../functions/_f');
// const c = require('../commands/_c');

const { log } = console;




// >----------------------------------------------------------------<
// >                           NOTION API                           <
// >----------------------------------------------------------------<

import { Client } from '@notionhq/client';

// Initializing a client
const notion = new Client({
	auth: process.env.NOTION_TOKEN,
});

APP.notion = {};
APP.notion.rssuabot = {};

async function notionRequest() {
	try {
		const blockId = process.env.NOTION_PAGEID;
		// const blockId = '2161290adfc34d84a8a76fe3334e1ff8';
		const response = await notion.blocks.children.list({
			block_id: blockId,
			page_size: 0,
		});

		APP.notion.rssuabot.phrases = [];
		const rssuabotPhrases = APP.notion.rssuabot.phrases;

		for await (const element of response.results) {
			const phrase = element?.paragraph?.rich_text[0]?.plain_text;
			if(phrase) rssuabotPhrases.push(phrase);
		}
		log('NOTION API LOADED');
	} catch (error) {
		console.error('ASM NOTION ERR:', error);
	}
}

async function notionText() {
	try {
		const blockId = process.env.NOTION_TEXTID;
		const response = await notion.blocks.children.list({
			block_id: blockId,
			page_size: 0,
		});

		APP.notion.rssuabot.words = [];
		APP.notion.rssuabot.text = [];
		let rssuabotWords = APP.notion.rssuabot.words;
		let rssuabotText = APP.notion.rssuabot.text;

		for await (const element of response.results) {
			const phrase = element?.paragraph?.rich_text[0]?.plain_text;

			// if(phrase) {
			// 	rssuabotPhrases = [...rssuabotPhrases, ...phrase.split(' ')];
			// }
			if(phrase) {
				rssuabotText.push(phrase);
				phrase.split(' ').forEach(word => {
					word = word.toLowerCase().trim();

					if (word.length > 0 && !/[^a-za-яA-ZА-ЯіІїЇґҐ,.!?]/.test(word)) {
						rssuabotWords.push(word);
					}

				});
			}
		}
		log(
			'NOTION PHRASES LOADED:\n',
			'Phrases:\n', rssuabotText.length, '\n',
			'Words:\n', rssuabotWords.length, '\n'
		);
	} catch (error) {
		console.error('ASM NOTION ERR:', error);
	}
}


// https://developers.notion.com/reference/patch-block-children
async function writeBlock(text, header) {

	const content = [];

	if (header) content.push({
		'heading_3': {
			'rich_text': [
				{
					'text': {
						'content': `${header}`,
					}
				}
			]
		}
	});

	if (text) content.push({
		'paragraph': {
			'rich_text': [
				{
					'text': {
						'content': `${text}`,
					}
				}
			]
		}
	});

	const blockId = process.env.NOTION_TEXTID;

	try {
		const response = await notion.blocks.children.append({
			block_id: blockId,
			children: content,
		});
		log('ADD TEXT TO NOTION');
		// console.log(response);
	} catch (error) {
		console.error('ASM NOTION ERR:', error);
	}
}


export default {
	notionRequest,
	writeBlock,
	notionText
};
