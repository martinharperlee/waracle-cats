import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    getFavourites,
    addFavourite,
    deleteFavourite,
} from './favourite.service';
import { RootState } from '../../app/store';
import { Favourite } from '../../types/favourite.type';
import { Status } from '../../types/status.type';
import { Statuses } from '../../enums/status';

export interface FavouritesState {
    data: Favourite[];
    changeStatus: {
        [key: string]: Status;
    };
}

interface ChangeDispatch {
    imageId: string;
    id: number;
}

const initialState: FavouritesState = {
    data: [],
    changeStatus: {},
};

export const loadFavourites = createAsyncThunk('favourites/fetch', async () =>
    getFavourites()
);

export const addFav = createAsyncThunk(
    'favourites/add',
    async (imageId: string) => addFavourite(imageId)
);

export const deleteFav = createAsyncThunk(
    'favourites/delete',
    async ({ imageId, id }: ChangeDispatch) => deleteFavourite(id)
);

const normaliseFavourites = (favourites: Favourite[]) =>
    favourites.map((fav: Favourite) => ({
        id: fav.id,
        image_id: fav.image_id,
    }));

export const favouritesSlice = createSlice({
    name: 'favourites',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadFavourites.fulfilled, (state, action) => {
                state.data = normaliseFavourites(action.payload);
            })
            .addCase(addFav.fulfilled, (state, action) => {
                const image_id = action.meta.arg;
                state.changeStatus[image_id] = Statuses.SUCCESS;
                state.data = [
                    ...state.data,
                    {
                        image_id,
                        id: action.payload.id,
                    },
                ];
            })
            .addCase(addFav.pending, (state, action) => {
                state.changeStatus[action.meta.arg] = Statuses.LOADING;
            })
            .addCase(deleteFav.fulfilled, (state, action) => {
                const { imageId, id } = action.meta.arg;
                state.changeStatus[imageId] = Statuses.SUCCESS;
                state.data = state.data.filter((fav) => fav.id !== id);
            })
            .addCase(deleteFav.pending, (state, action) => {
                state.changeStatus[action.meta.arg.imageId] = Statuses.LOADING;
            });
    },
});

export const selectFavourite = (imageId: string) => (state: RootState) => {
    return state.favourites.data.find((fav) => fav.image_id === imageId);
};

export const selectChangeFavouriteIsLoading =
    (imageId: string) =>
    (state: RootState): boolean =>
        state.favourites.changeStatus[imageId] === Statuses.LOADING;

export default favouritesSlice.reducer;
