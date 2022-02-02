import React from 'react';
import {Provider} from 'react-redux'
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import Cats from './Cats';
import Grid from '../grid/Grid';
import Cat from './Cat';
import { Statuses } from '../../enums/status';
import { RootState } from '../../app/store';
import thunk from 'redux-thunk';
import { mockState } from '../../mockData';

const mockStore = configureMockStore([thunk]);

describe('<Cats>', () => {
    it('should render component with correct elements', () => {
        const store = mockStore(mockState);
        const wrapper = mount(
            <Provider store={store}>
                <Cats />
            </Provider>
        )
        expect(wrapper.find(Grid).exists()).toBeTruthy();
        expect(wrapper.find(Cat).exists()).toBeTruthy();
        expect(wrapper.find(Cat).length).toBe(3);
    })
})