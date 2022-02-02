import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Statuses } from '../../enums/status';
import { Image } from '../../types/image.type';
import { Status } from '../../types/status.type';
import { getImages } from './cats.service';

export interface CatState {
    data: Image[];
    status: Status;
}

const initialState: CatState = {
    data: [],
    status: Statuses.INITIAL,
};

export const loadCats = createAsyncThunk('cats/fetch', async () => getImages());

export const normaliseCats = (Images: Image[]) => {
    return Images.map((image: Image) => ({
        id: image.id,
        url: image.url,
    }));
};

export const catsSlice = createSlice({
    name: 'cats',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadCats.pending, (state) => {
                state.status = Statuses.LOADING;
            })
            .addCase(loadCats.fulfilled, (state, action) => {
                state.status = Statuses.SUCCESS;
                state.data = normaliseCats(action.payload);
            });
    },
});

export const selectCats = (state: RootState) => state.cats.data;
export const selectCatsAreLoading = (state: RootState) =>
    state.cats.status === Statuses.LOADING;

export default catsSlice.reducer;
