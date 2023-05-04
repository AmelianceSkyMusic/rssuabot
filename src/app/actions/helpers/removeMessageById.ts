import { returnError } from '~helpers/returnError';
import type { Ctx } from '~types/Ctx';

export async function removeMessageById(
	ctx: Ctx,
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
