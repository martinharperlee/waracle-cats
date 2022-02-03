import { Statuses } from '../../enums/status';
import { mockState } from '../../mockData';
import votesReducer, { selectChangeVoteIsLoading } from './votes.slice';

describe('votes reducer', () => {
    it('should handle initial state', () => {
        expect(votesReducer(undefined, { type: 'unknown' })).toEqual({
            data: [],
            changeStatus: {},
        });
    });

    it('selectChangeVoteIsLoading should return true if status of a specific vote that is loading', () => {
        expect(
            selectChangeVoteIsLoading('cat2')({
                ...mockState,
                votes: {
                    ...mockState.votes,
                    changeStatus: { cat2: Statuses.LOADING },
                },
            })
        ).toBeTruthy();
        expect(selectChangeVoteIsLoading('cat1')(mockState)).toBeFalsy();
        expect(
            selectChangeVoteIsLoading('cat3')({
                ...mockState,
                votes: {
                    ...mockState.votes,
                    changeStatus: { cat2: Statuses.LOADING },
                },
            })
        ).toBeFalsy();
        expect(
            selectChangeVoteIsLoading('cat2')({
                ...mockState,
                votes: {
                    ...mockState.votes,
                    changeStatus: { cat1: Statuses.LOADING },
                },
            })
        ).toBeFalsy();
    });
});
