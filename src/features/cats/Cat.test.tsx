import React from 'react';
import { shallow } from 'enzyme';
import Cat from './Cat';
import { mockCat1 } from '../../mockData';

describe('<Cat>', () => {
    it('should render component with correct elements', () => {
        const wrapper = shallow(<Cat {...mockCat1} />);
        expect(wrapper.find('.cat').exists()).toBeTruthy();
        expect(wrapper.find('.cat__wrapper').exists()).toBeTruthy();
        expect(wrapper.find('.cat__image').exists()).toBeTruthy();
        expect(wrapper.find('.cat__image').props().src).toBe(mockCat1.url);
    });
});
