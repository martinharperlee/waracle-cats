import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import Votes from './Votes';
import thunk from 'redux-thunk';
import { mockState, mockVotes } from '../../mockData';
import { Statuses } from '../../enums/status';
import { RootState } from '../../app/store';

const mockStore = configureMockStore([thunk]);

describe('<Votes>', () => {
    it('should render component with correct elements', () => {
        const store = mockStore(mockState);
        const wrapper = mount(
            <Provider store={store}>
                <Votes imageId="cat1" />
            </Provider>
        );
        expect(wrapper.find('.votes').exists()).toBeTruthy();
        expect(wrapper.find('.votes__count').exists()).toBeTruthy();
        expect(wrapper.find('.votes__btn').length).toBe(2);
        expect(wrapper.find('.votes--loading').exists()).toBeFalsy();
    });

    it('should render correct count', () => {
        const store = mockStore(mockState);
        const wrapper = mount(
            <Provider store={store}>
                <Votes imageId="cat3" />
            </Provider>
        );
        expect(wrapper.find('.votes__count').exists()).toBeTruthy();
        expect(wrapper.find('.votes__count').text()).toBe('1');
    });

    it('should render only disabled buttons when user has not voted', () => {
        const store = mockStore(mockState);
        const wrapper = mount(
            <Provider store={store}>
                <Votes imageId="cat3" />
            </Provider>
        );
        expect(wrapper.find('.votes__up').props().disabled).toBe(undefined);
        expect(wrapper.find('.votes__down').props().disabled).toBe(undefined);
    });

    it('should only render component in loading state if has matching id', () => {
        const store = mockStore({
            ...mockState,
            votes: {
                ...mockVotes,
                changeStatus: { cat2: Statuses.LOADING },
            },
        } as RootState);
        const wrapper1 = mount(
            <Provider store={store}>
                <Votes imageId="cat1" />
            </Provider>
        );
        const wrapper2 = mount(
            <Provider store={store}>
                <Votes imageId="cat2" />
            </Provider>
        );
        expect(wrapper1.find('.votes--loading').exists()).toBeFalsy();
        expect(wrapper2.find('.votes--loading').exists()).toBeTruthy();
    });
});
