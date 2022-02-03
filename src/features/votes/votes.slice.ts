import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    getVotes,
    addVote as apiAddVote,
    deleteVote as apiDeleteVote,
} from './votes.service';
import { RootState } from '../../app/store';
import { Vote } from '../../types/vote.type';
import { getUserId } from '../../services/userId.service';
import { Status } from '../../types/status.type';
import { Statuses } from '../../enums/status';

export interface VotesState {
    data: Vote[];
    changeStatus: {
        [key: string]: Status;
    };
}

export interface ChangeVoteDispatch {
    userVote?: Vote;
    value: number;
    imageId: string;
}

const initialState: VotesState = {
    data: [],
    changeStatus: {},
};

export const loadVotes = createAsyncThunk('votes/fetch', async () =>
    getVotes()
);

export const changeVote = createAsyncThunk(
    'votes/change',
    async ({ userVote, value, imageId }: ChangeVoteDispatch, thunkAPI) => {
        if (userVote && userVote.value !== value) {
            thunkAPI.dispatch(deleteVote({ imageId, value, userVote }));
        }
        if (!userVote) {
            thunkAPI.dispatch(addVote({ imageId, value, userVote }));
        }
    }
);

export const deleteVote = createAsyncThunk(
    'votes/delete',
    async ({ imageId, userVote }: ChangeVoteDispatch) =>
        userVote && apiDeleteVote(userVote.id)
);

export const addVote = createAsyncThunk(
    'votes/add',
    async ({ imageId, value }: ChangeVoteDispatch) => apiAddVote(imageId, value)
);

const normaliseVotes = (votes: Vote[]) =>
    votes.map((vote: Vote) => ({
        id: vote.id,
        image_id: vote.image_id,
        sub_id: vote.sub_id,
        value: vote.value,
    }));

export const votesSlice = createSlice({
    name: 'votes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadVotes.fulfilled, (state, action) => {
                state.data = normaliseVotes(action.payload);
            })
            .addCase(addVote.fulfilled, (state, action) => {
                const id: string = action.meta.arg.imageId;
                state.changeStatus[id] = Statuses.SUCCESS;
                state.data = [
                    ...state.data,
                    {
                        id: action.payload.id,
                        image_id: id,
                        sub_id: getUserId(),
                        value: action.meta.arg.value as 1 | 0,
                    },
                ];
            })
            .addCase(addVote.pending, (state, action) => {
                const id: string = action.meta.arg.imageId;
                state.changeStatus[id] = Statuses.LOADING;
            })
            .addCase(deleteVote.fulfilled, (state, action) => {
                const id: string = action.meta.arg.imageId;
                state.changeStatus[id] = Statuses.SUCCESS;
                state.data = state.data.filter(
                    (vote: Vote) => vote.id !== action.meta.arg.userVote?.id
                );
            })
            .addCase(deleteVote.pending, (state, action) => {
                const id: string = action.meta.arg.imageId;
                state.changeStatus[id] = Statuses.LOADING;
            });
    },
});

const getVoteValue = (current: number, data: number): number =>
    data === 1 ? current + 1 : current - 1;

export const selectVoteCount =
    (imageId: string) =>
    (state: RootState): number =>
        state.votes.data.reduce((acc: number, vote: Vote) => {
            return vote.image_id === imageId
                ? getVoteValue(acc, vote.value)
                : acc;
        }, 0);

export const selectUserVote =
    (imageId: string) =>
    (state: RootState): Vote | undefined =>
        state.votes.data.find(
            (vote: Vote) =>
                vote.sub_id === getUserId() && vote.image_id === imageId
        );

export const selectChangeVoteIsLoading =
    (imageId: string) =>
    (state: RootState): boolean =>
        state.votes.changeStatus[imageId] === Statuses.LOADING;

export default votesSlice.reducer;
