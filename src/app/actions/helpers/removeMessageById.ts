import { returnError } from '../../helpers/returnError';
import type { Ctx } from '../../types/Ctx';

interface RemoveMessageById {
	ctx: Ctx;
	messageId: number;
	ms?: number;
}

export async function removeMessageById({
	ctx,
	messageId,
	ms = 3600,
}: RemoveMessageById): Promise<boolean> {
	return new Promise((resolve) => {
		setTimeout(async () => { // remove messages
			try {
				await ctx.api.deleteMessage(
					ctx.chat.id,
					messageId,
				);
				resolve(true);
			} catch (error) {
				returnError(error);
				resolve(false);
			}
		}, ms);
	});
}
