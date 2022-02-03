import classList from './classList';

describe('classList', () => {
    it('returns string with correct css classes', () => {
        const variablePram = 'varClass';
        expect(
            classList({
                myClass: true,
                myExtraClass: true,
                notMyClass: false,
                [variablePram]: true,
            })
        ).toBe('myClass myExtraClass varClass');
    });
});
