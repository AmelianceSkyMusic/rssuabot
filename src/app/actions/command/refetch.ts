import { bot } from '../../../../api/bot';
import { returnError } from '../../helpers/returnError';
import { phrasesStore } from '../../store/phrasesStore';

export function refetch() {
	bot.command('refetch', async () => {
		try {
			phrasesStore.getState().fetchStudentPhrases();
			phrasesStore.getState().fetchRandomPhrases();
			phrasesStore.getState().fetchRandomClickPhrases();
			phrasesStore.getState().fetchChatReplies();
			phrasesStore.getState().fetchChosenPhrases();
		} catch (error) { returnError(error); }
	});
}
