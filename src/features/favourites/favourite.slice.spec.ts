import { Statuses } from '../../enums/status';
import { mockFavouite, mockFavouites, mockState } from '../../mockData';
import favouriteReducer, {
    normaliseFavourites,
    selectFavourite,
    selectChangeFavouriteIsLoading,
} from './favourite.slice';

describe('favourites reducer', () => {
    it('should handle initial state', () => {
        expect(favouriteReducer(undefined, { type: 'unknown' })).toEqual({
            data: [],
            changeStatus: {},
        });
    });

    it('normaliseFavourites should return favourite data with only required parameter', () => {
        const unSanitizedData = [
            {
                ...mockFavouite,
                extraNumericParameter: 2,
                extraStringParameter: 'extra',
            },
        ];
        expect(normaliseFavourites(unSanitizedData)).toEqual(
            mockFavouites.data
        );
    });

    it('selectFavourite should return only specified parameters', () => {
        expect(selectFavourite('cat2')(mockState)).toBe(mockFavouite);
    });

    it('selectChangeFavouriteIsLoading should return true if the status of a specific favourite is loading', () => {
        expect(
            selectChangeFavouriteIsLoading('cat2')({
                ...mockState,
                favourites: {
                    ...mockState.favourites,
                    changeStatus: { cat2: Statuses.LOADING },
                },
            })
        ).toBeTruthy();
        expect(selectChangeFavouriteIsLoading('cat1')(mockState)).toBeFalsy();
        expect(
            selectChangeFavouriteIsLoading('cat3')({
                ...mockState,
                favourites: {
                    ...mockState.favourites,
                    changeStatus: { cat2: Statuses.LOADING },
                },
            })
        ).toBeFalsy();
        expect(
            selectChangeFavouriteIsLoading('cat2')({
                ...mockState,
                favourites: {
                    ...mockState.favourites,
                    changeStatus: { cat1: Statuses.LOADING },
                },
            })
        ).toBeFalsy();
    });
});
