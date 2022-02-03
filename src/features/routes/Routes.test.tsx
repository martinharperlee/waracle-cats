import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';

describe('<Routes />', () => {
    it('render routes', () => {
        const wrapper = mount(
            <Router>
                <Routes />
            </Router>
        );
        expect(wrapper.find('Suspense').exists()).toBeTruthy();
        expect(wrapper.find(Routes).exists()).toBeTruthy();
    });
});
