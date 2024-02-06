import { createSlice } from '@reduxjs/toolkit';
import { fetchTranslate } from './translate.action';

export interface TranslateState {
	status: 'loading' | 'success' | 'rejected';
	values: {
		valueTranslate: string;
		valueOutput: string;
	};

	currentLang: {
		from: { name: string; short: string };
		to: { name: string; short: string };
	};
}

const initialState: TranslateState = {
	status: 'loading',
	values: {
		valueTranslate: 'Привіт, як справи?',
		valueOutput: '',
	},
	currentLang: {
		from: { name: 'Ukrainian', short: 'uk' },
		to: { name: 'English', short: 'en' },
	},
};

export const translateSlice = createSlice({
	name: 'translate',
	initialState,
	reducers: {
		setValues: (state, action) => {
			state.values = action.payload;
		},

		setLanguage: (state, action) => {
			state.currentLang = action.payload;
		},
		doSwitch: state => {
			let tempCurrentLang = state.currentLang;
			let tempValues = state.values;

			state.values = {
				valueTranslate: tempValues.valueOutput,
				valueOutput: tempValues.valueTranslate,
			};

			state.currentLang = {
				from: tempCurrentLang.to,
				to: tempCurrentLang.from,
			};
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchTranslate.pending, state => {
			state.status = 'loading';
		});
		builder.addCase(fetchTranslate.fulfilled, (state, action) => {
			state.status = 'success';
			state.values.valueOutput = action.payload.responseData.translatedText;
		});
		builder.addCase(fetchTranslate.rejected, state => {
			state.status = 'rejected';
		});
	},
});

export const { setValues, setLanguage, doSwitch } = translateSlice.actions;
export default translateSlice.reducer;
