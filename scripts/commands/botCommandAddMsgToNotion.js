// >----------------------------------------------------------------<
// >                            MODULES                             <
// >----------------------------------------------------------------<

import { f, APP, notionAPI } from '../_g.js';




// >----------------------------------------------------------------<
// >                           FUNCTIONS                            <
// >----------------------------------------------------------------<

export default function botCommandAddMsgToNotion() {

	// ^------------------------ remove service removed left message ------------------------
	APP.BOT.on('message', async (ctx) => {
		const { userText, userFirstName, userUsername, userId, userDateShort  } = await f.getInfo(ctx);
		const heading = `${userFirstName} (@${userUsername}) [${userId}]}\n${userDateShort}`;
		await notionAPI.writeBlock(userText, heading);
	});
}
