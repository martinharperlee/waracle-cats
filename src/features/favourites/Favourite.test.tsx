import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import Favourite from './Favourite';
import thunk from 'redux-thunk';
import { mockFavouites, mockState } from '../../mockData';
import { RootState } from '../../app/store';
import { Statuses } from '../../enums/status';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const mockStore = configureMockStore([thunk]);

describe('<Favourite>', () => {
    it('should render component with correct elements', () => {
        const store = mockStore(mockState);
        const wrapper = mount(
            <Provider store={store}>
                <Favourite imageId="cat1" />
            </Provider>
        );
        expect(wrapper.find('.favourite').exists()).toBeTruthy();
        expect(wrapper.find('.favourite__icon').exists()).toBeTruthy();
        expect(wrapper.find('.favourite--loading').exists()).toBeFalsy();
    });

    it('should render component with empty heart icon', () => {
        const store = mockStore(mockState);
        const wrapper = mount(
            <Provider store={store}>
                <Favourite imageId="cat1" />
            </Provider>
        );
        expect(wrapper.find(FaRegHeart).exists()).toBeTruthy();
        expect(wrapper.find(FaHeart).exists()).toBeFalsy();
    });

    it('should render component with filled heart icon', () => {
        const store = mockStore(mockState);
        const wrapper = mount(
            <Provider store={store}>
                <Favourite imageId="cat2" />
            </Provider>
        );
        expect(wrapper.find(FaRegHeart).exists()).toBeFalsy();
        expect(wrapper.find(FaHeart).exists()).toBeTruthy();
    });

    it('should only render component in loading state if has matching id', () => {
        const store = mockStore({
            ...mockState,
            favourites: {
                ...mockFavouites,
                changeStatus: { cat2: Statuses.LOADING },
            },
        } as RootState);
        const wrapper1 = mount(
            <Provider store={store}>
                <Favourite imageId="cat1" />
            </Provider>
        );
        const wrapper2 = mount(
            <Provider store={store}>
                <Favourite imageId="cat2" />
            </Provider>
        );
        expect(wrapper1.find('.favourite--loading').exists()).toBeFalsy();
        expect(wrapper2.find('.favourite--loading').exists()).toBeTruthy();
    });
});
