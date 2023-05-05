import { bot } from '../../../../api/bot';
import { returnError } from '../../helpers/returnError';
import { helpers } from '../helpers';

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
	bot.command(['transliterate', 'tr'], async (ctx) => {
		try {
			const messageId = ctx.msg.message_id;
			await helpers.removeMessageById(ctx, messageId, 0);

			const replyToMessage = ctx.msg.reply_to_message;

			if (replyToMessage) {
				const repliedMessageId = replyToMessage.message_id;
				const repliedMessageTest = replyToMessage.text || '';

				const repliedUserFullNameTag = helpers.generateReplyingUserFullNameTag(ctx);

				const transliteratedMsg =	transliterateText(repliedMessageTest);

				await ctx.reply(
					`${repliedUserFullNameTag}, можливо малось на увазі?:\n\n<i>${transliteratedMsg}</i>`,
					{
						reply_to_message_id: repliedMessageId,
						parse_mode: 'HTML',
					},
				);
			} else {
				await helpers.autoRemovableMessage({
					ctx,
					text: 'команда /transliterate (/tr) працює тільки як Reply!',
					mention: true,
				});
			}
		} catch (error) { returnError(error); }
	});
}
