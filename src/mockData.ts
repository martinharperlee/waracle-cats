import { RootState } from "./app/store";
import { Statuses } from "./enums/status";

export const mockCat1 = { id: 'cat1', url: 'https://cats.cat.jpeg'}
export const mockCat2 = { id: 'cat2', url: 'https://cats.cat.jpeg'}
export const mockCat3 = { id: 'cat3', url: 'https://cats.cat.jpeg'}
export const mockCatsData = [ mockCat1, mockCat2, mockCat3 ];
export const mockCats = { status: Statuses.INITIAL, data: mockCatsData };
export const mockUpload = { status: Statuses.INITIAL };
export const mockFavouites = { changeStatus: {}, data: [] };
export const mockVotes = { changeStatus: {}, data: [] };
export const mockState: RootState = {
    cats: mockCats,
    votes: mockVotes,
    favourites: mockFavouites,
    upload: mockUpload
}