import { Statuses } from '../../enums/status';
import catReducer, {
    CatState,

} from './cats.slice';

describe('cat reducer', () => {
    const initialState: CatState = {
        data: [],
        status: Statuses.ERROR,
    };
    it('should handle initial state', () => {
        expect(catReducer(undefined, { type: 'unknown' })).toEqual({
            data: [],
            status: Statuses.INITIAL,
        });
    });


});
