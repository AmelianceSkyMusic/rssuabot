import { createStore } from 'zustand/vanilla';

import { ENV } from '~/bot';
import { removeEmptyValues } from '~/src/ameliance-scripts/scripts';
import { api } from '~api/index';
import { returnError } from '~helpers/returnError';

const { GOOGLE_DATA_TABLE_ID } = ENV;

interface PhrasesStore {
	studentPhrases: string[];
	randomPhrases: string[];
	randomClickPhrases: string[];
	chatReplies: string[];
	loading: boolean;
	error: string | null;
	fetchStudentPhrasesData: () => void;
	fetchRandomPhrasesData: () => void;
	fetchRandomClickPhrasesData: () => void;
	fetchChatRepliesData: () => void;
}

export const phrasesStore = createStore<PhrasesStore>((set) => ({
	studentPhrases: [],
	randomPhrases: [],
	randomClickPhrases: [],
	chatReplies: [],
	loading: false,
	error: null,

	fetchStudentPhrasesData: async () => {
		set({ loading: true });
		try {
			const response = await api
				.google.appsscript.getUntitledColumnsDataByIndexes({
					spreadsheetId: GOOGLE_DATA_TABLE_ID || '',
					sheetName: 'studentPhrases',
					columnIndexes: [1],
				});

			const tablesData = response.data[0].map((item) => item.value);
			const phrases = removeEmptyValues(tablesData);

			set({ studentPhrases: phrases, error: null });
		} catch (error) {
			set({ error: returnError(error) });
		} finally {
			set({ loading: false });
		}
	},

	fetchRandomPhrasesData: async () => {
		set({ loading: true });
		try {
			const response = await api
				.google.appsscript.getUntitledColumnsDataByIndexes({
					spreadsheetId: GOOGLE_DATA_TABLE_ID || '',
					sheetName: 'randomPhrases',
					columnIndexes: [1],
				});

			const tablesData = response.data[0].map((item) => item.value);
			const phrases = removeEmptyValues(tablesData);

			set({ randomPhrases: phrases, error: null });
		} catch (error) {
			set({ error: returnError(error) });
		} finally {
			set({ loading: false });
		}
	},

	fetchRandomClickPhrasesData: async () => {
		set({ loading: true });
		try {
			const response = await api
				.google.appsscript.getUntitledColumnsDataByIndexes({
					spreadsheetId: GOOGLE_DATA_TABLE_ID || '',
					sheetName: 'randomClickPhrases',
					columnIndexes: [1],
				});

			const tablesData = response.data[0].map((item) => item.value);
			const phrases = removeEmptyValues(tablesData);

			set({ randomClickPhrases: phrases, error: null });
		} catch (error) {
			set({ error: returnError(error) });
		} finally {
			set({ loading: false });
		}
	},

	fetchChatRepliesData: async () => {
		set({ loading: true });
		try {
			const response = await api
				.google.appsscript.getUntitledColumnsDataByIndexes({
					spreadsheetId: GOOGLE_DATA_TABLE_ID || '',
					sheetName: 'chatReplies',
					columnIndexes: [1],
				});

			const tablesData = response.data[0].map((item) => item.value);
			const phrases = removeEmptyValues(tablesData);

			set({ chatReplies: phrases, error: null });
		} catch (error) {
			set({ error: returnError(error) });
		} finally {
			set({ loading: false });
		}
	},

}));

export const { getState, setState, subscribe } = phrasesStore;
