import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTranslate = createAsyncThunk(
	'users/fetchById',
	// if you type your function argument here
	async ({ from, to }: { from: string; to: string }) => {
		const { data } = await axios.get(
			`https://api.mymemory.translated.net/get?q=Hello,%20how%20are%20you?!&langpair=${from}|${to}`
		);
		return data;
	}
);
