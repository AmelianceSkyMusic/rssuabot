import { bot } from '~/index';
import { returnError } from '~helpers/returnError';

import { autoRemovableMessage } from '../helpers/autoRemovableMessage';
import { generateFullName } from '../helpers/generateFullName';
import { generateUserTag } from '../helpers/generateUserTag';
import removeMsgById from '../helpers/removeMessageById';

const UA = [
	'!', '"', '№', ';', '%', ':', '?',
	'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ї', 'Ф', 'І', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Є', '/', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',',
	'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ї', 'ф', 'і', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'є', '\\', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.'];
const EN = [
	'!', '@', '#', '$', '%', '^', '&',
	'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', '|', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?',
	'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', '\\', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'];

const transliterateText = (text: string) => text
	.split('').map((char) => {
		const charIndex = EN.indexOf(char);
		if (charIndex >= 0) return UA[charIndex];
		return char;
	}).join('');

export function transliterate() {
	bot.command('tr', async (ctx) => {
		try {
			const messageId = ctx.msg.message_id;

			const replyToMessage = ctx.msg.reply_to_message;
			await removeMsgById(ctx, messageId, 0);

			if (replyToMessage) {
				const repliedMessageId = replyToMessage.message_id;
				const repliedMessageTest = replyToMessage.text || '';

				const repliedMessageUserId = replyToMessage.from?.id || '';
				const repliedMessageUserFirstName = replyToMessage.from?.first_name || '';
				const repliedMessageUserLastName = replyToMessage.from?.last_name || '';
				const repliedMessageUserFullName = generateFullName(
					repliedMessageUserFirstName,
					repliedMessageUserLastName,
				);

				const repliedMessageUserTag =	generateUserTag(
					repliedMessageUserId,
					repliedMessageUserFullName,
				);

				const transliteratedMsg =	transliterateText(repliedMessageTest);

				await ctx.reply(
					`${repliedMessageUserTag}, можливо малось на увазі?:\n\n<i>${transliteratedMsg}</i>`,
					{
						reply_to_message_id: repliedMessageId,
						parse_mode: 'HTML',
					},
				);
			} else {
				await autoRemovableMessage({
					ctx,
					text: 'Команда /tr працює тільки як Reply!',
					reply: true,
				});
			}
		} catch (error) { returnError(error); }
	});
}
