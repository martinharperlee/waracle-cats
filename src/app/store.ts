import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import catsReducer from '../features/cats/cats.slice';
import uploadReducer from '../features/upload/upload.slice';
import favouritesReducer from '../features/favourites/favourite.slice';
import votesReducer from '../features/votes/votes.slice';

export const store = configureStore({
    reducer: {
        cats: catsReducer,
        upload: uploadReducer,
        favourites: favouritesReducer,
        votes: votesReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
