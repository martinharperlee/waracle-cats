import { Statuses } from '../../enums/status';
import {
    mockCat1,
    mockCat2,
    mockCat3,
    mockCatsData,
    mockState,
} from '../../mockData';
import catReducer, {
    normaliseCats,
    selectCats,
    selectCatsAreLoading,
} from './cats.slice';

describe('cat reducer', () => {
    it('should handle initial state', () => {
        expect(catReducer(undefined, { type: 'unknown' })).toEqual({
            data: [],
            status: Statuses.INITIAL,
        });
    });

    it('normaliseCats should return cat data with only required parameters', () => {
        const unSanitizedData = [
            {
                ...mockCat1,
                extraNumericParameter: 2,
                extraStringParameter: 'extra',
            },
            mockCat2,
            mockCat3,
        ];
        expect(normaliseCats(unSanitizedData)).toEqual(mockCatsData);
    });

    it('selectCats should return cats data', () => {
        expect(selectCats(mockState)).toBe(mockCatsData);
    });

    it('selectCatsAreLoading should return false if status is not loading', () => {
        expect(selectCatsAreLoading(mockState)).toBeFalsy();
    });

    it('selectCatsAreLoading should return true if status is loading', () => {
        expect(
            selectCatsAreLoading({
                ...mockState,
                cats: {
                    ...mockState.cats,
                    status: Statuses.LOADING,
                },
            })
        ).toBeTruthy();
    });
});
