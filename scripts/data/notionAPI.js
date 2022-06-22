const { log } = require('console');

const {APP} = require('../data/app');
const asm = require('../modules/_asm');
const f = require('../functions/_f');
const c = require('../commands/_c');

// >----------------------------------------------------------------<
// >                           NOTION API                           <
// >----------------------------------------------------------------<

const { Client } = require("@notionhq/client")

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})
async function notionRequest() {
	try {
		const blockId = process.env.NOTION_PAGEID;
		// const blockId = '2161290adfc34d84a8a76fe3334e1ff8';
		const response = await notion.blocks.children.list({
		block_id: blockId,
		page_size: 50,
		});
		APP.notion = {};
		APP.notion.rssuabot = {};
		APP.notion.rssuabot.phrases = [];
		const rssuabotPhrases = APP.notion.rssuabot.phrases

		for await (const element of response.results) {
			const phrase = element?.paragraph?.rich_text[0]?.plain_text;
			if(phrase) rssuabotPhrases.push(phrase)
		}
		log('NOTION API LOADED')
	} catch (error) {
		console.error('ASM NOTION ERR:', error);
	}
}

module.exports = {
    notionRequest,
}
