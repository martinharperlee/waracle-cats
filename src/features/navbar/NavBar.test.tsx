import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import NavBar from './NavBar';
import { Statuses } from '../../enums/status';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const mockStore = configureMockStore([]);

describe('<NavBar>', () => {
    it('should render component with correct elements', () => {
        const store = mockStore({
            cats: { status: Statuses.INITIAL },
        });
        const wrapper = mount(
            <Provider store={store}>
                <Router>
                    <NavBar />
                </Router>
            </Provider>
        );
        expect(wrapper.find('.navbar').exists()).toBeTruthy();
        expect(wrapper.find('.navbar--loading').exists()).toBeFalsy();
        expect(wrapper.find(Link).length).toBe(2);
    });
    it('should render component in loading state', () => {
        const store = mockStore({
            cats: { status: Statuses.LOADING },
        });
        const wrapper = mount(
            <Router>
                <Provider store={store}>
                    <NavBar />
                </Provider>
            </Router>
        );
        expect(wrapper.find('.navbar').exists()).toBeTruthy();
        expect(wrapper.find('.navbar--isLoading').exists()).toBeTruthy();
    });
});
