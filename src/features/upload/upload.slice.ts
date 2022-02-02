import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { uploadImage } from './upload.service';
import { RootState } from '../../app/store';
import { Statuses } from '../../enums/status';
import { Status } from '../../types/status.type';

export interface UploadState {
    status: Status;
}

const initialState: UploadState = {
    status: Statuses.INITIAL,
};

export const uploadCat = createAsyncThunk(
    'upload/sendImage',
    async (file: File) => uploadImage(file)
);

export const uploadSlice = createSlice({
    name: 'upload',
    initialState,
    reducers: {
        setStatus: (state, action: PayloadAction<Status>) => {
            state.status = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(uploadCat.pending, (state) => {
                state.status = Statuses.LOADING;
            })
            .addCase(uploadCat.fulfilled, (state, action) => {
                state.status =
                    action.payload.approved === 1
                        ? Statuses.SUCCESS
                        : Statuses.ERROR;
            })
            .addCase(uploadCat.rejected, (state, action) => {
                state.status = Statuses.ERROR;
            });
    },
});

export const { setStatus } = uploadSlice.actions;

export const selectStatus = (state: RootState) => state.upload.status;

export default uploadSlice.reducer;
