import { RootState } from './app/store';
import { Statuses } from './enums/status';
import { CatState } from './features/cats/cats.slice';
import { FavouriteState } from './features/favourites/favourite.slice';
import { UploadState } from './features/upload/upload.slice';
import { VotesState } from './features/votes/votes.slice';
import { Favourite } from './types/favourite.type';
import { Image } from './types/image.type';
import { Vote } from './types/vote.type';

export const userId1 = 'user1';
export const userId2 = 'user2';
export const userId3 = 'user3';
export const mockCat1: Image = { id: 'cat1', url: 'https://cats.cat.jpeg' };
export const mockCat2: Image = { id: 'cat2', url: 'https://cats.cat.jpeg' };
export const mockCat3: Image = { id: 'cat3', url: 'https://cats.cat.jpeg' };
export const mockCatsData: Image[] = [mockCat1, mockCat2, mockCat3];
export const mockCats: CatState = {
    status: Statuses.INITIAL,
    data: mockCatsData,
};
export const mockUpload: UploadState = { status: Statuses.INITIAL };
export const mockFavouite: Favourite = { id: 1, image_id: 'cat2' };
export const mockFavouites: FavouriteState = {
    changeStatus: {},
    data: [mockFavouite],
};
export const mockVote1: Vote = {
    id: 1,
    image_id: 'cat3',
    sub_id: userId1,
    value: 1,
};
export const mockVote2: Vote = {
    id: 2,
    image_id: 'cat3',
    sub_id: userId2,
    value: 0,
};
export const mockVote3: Vote = {
    id: 3,
    image_id: 'cat3',
    sub_id: userId3,
    value: 1,
};
export const mockVoteData: Vote[] = [mockVote1, mockVote2, mockVote3];
export const mockVotes: VotesState = { changeStatus: {}, data: mockVoteData };
export const mockState: RootState = {
    cats: mockCats,
    votes: mockVotes,
    favourites: mockFavouites,
    upload: mockUpload,
};
