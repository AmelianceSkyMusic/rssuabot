import { bot } from '../../../../api/bot';
import { returnError } from '../../helpers/returnError';
import { phrasesStore } from '../../store/phrasesStore';

export function refetch() {
	bot.command('refetch', async () => {
		try {
			phrasesStore.getState().fetchStudentPhrasesData();
			phrasesStore.getState().fetchRandomPhrasesData();
			phrasesStore.getState().fetchRandomClickPhrasesData();
			phrasesStore.getState().fetchChatRepliesData();
		} catch (error) { returnError(error); }
	});
}
