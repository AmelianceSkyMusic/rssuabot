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
	chosenPhrases: string[];
	chosenPhrasesRandomWords: string[];
	loading: boolean;
	error: string | null;
	fetchStudentPhrases: () => void;
	fetchRandomPhrases: () => void;
	fetchRandomClickPhrases: () => void;
	fetchChatReplies: () => void;
	fetchChosenPhrases: () => void;
}

export const phrasesStore = createStore<PhrasesStore>((set) => ({
	studentPhrases: [],
	randomPhrases: [],
	randomClickPhrases: [],
	chatReplies: [],
	randomWords: [],
	chosenPhrases: [],
	chosenPhrasesRandomWords: [],
	loading: false,
	error: null,

	fetchStudentPhrases: async () => {
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

	fetchRandomPhrases: async () => {
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

	fetchRandomClickPhrases: async () => {
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

	fetchChatReplies: async () => {
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

	fetchChosenPhrases: async () => {
		set({ loading: true });
		try {
			const response = await api
				.google.appsscript.getUntitledColumnsDataByIndexes({
					spreadsheetId: GOOGLE_DATA_TABLE_ID || '',
					sheetName: 'chosenPhrases',
					columnIndexes: [1],
				});

			const tablesData = response.data[0].map((item) => item.value);
			const phrases = removeEmptyValues(tablesData);
			const chosenPhrasesRandomWords = phrases.join(' ').split(' ');

			set({ chosenPhrases: phrases, chosenPhrasesRandomWords, error: null });
		} catch (error) {
			set({ error: returnError(error) });
		} finally {
			set({ loading: false });
		}
	},

}));

export const { getState, setState, subscribe } = phrasesStore;
