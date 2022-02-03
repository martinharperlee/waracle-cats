import React from 'react';
import { shallow } from 'enzyme';
import Template from './Template';
import NavBar from '../navbar/NavBar';
import { Routes } from 'react-router-dom';

describe('<Template />', () => {
    it('render template', () => {
        const wrapper = shallow(<Template />);
        expect(wrapper.find(NavBar)).toBeTruthy();
        expect(wrapper.find(Routes)).toBeTruthy();
    });
});
