import { createStore } from 'zustand/vanilla';

import { removeEmptyValues } from '../../ameliance-scripts/scripts';
import { api } from '../api/index';
import { returnError } from '../helpers/returnError';

import 'dotenv/config';

const { GOOGLE_DATA_TABLE_ID } = process.env;

interface PhrasesStore {
	studentPhrases: string[];
	randomPhrases: string[];
	randomClickPhrases: string[];
	chatReplies: string[];
	randomWords: string[];
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
	randomWords: [],
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
			const randomWords = phrases.join(' ').split(' ');

			set({ chatReplies: phrases, randomWords, error: null });
		} catch (error) {
			set({ error: returnError(error) });
		} finally {
			set({ loading: false });
		}
	},

}));

export const { getState, setState, subscribe } = phrasesStore;
