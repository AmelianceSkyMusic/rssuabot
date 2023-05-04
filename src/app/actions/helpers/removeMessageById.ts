import type { CommandContext, Context } from 'grammy';

import { returnError } from '~helpers/returnError';

export default async function removeMsgById(
	ctx: CommandContext<Context>,
	msgId: number,
	ms: number,
): Promise<boolean> {
	return new Promise((resolve) => {
		setTimeout(async () => { // remove messages
			try {
				await ctx.api.deleteMessage(
					ctx.chat.id,
					msgId,
				);
				resolve(true);
			} catch (error) {
				returnError(error);
				resolve(false);
			}
		}, ms);
	});
}
