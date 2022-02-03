import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mockState } from '../../mockData';
import Grid from '../grid/Grid';
import Upload from './Upload';
import { BrowserRouter as Router } from 'react-router-dom';
import { Statuses, UploadStatusMessages } from '../../enums/status';
import { FaCat, FaCloudUploadAlt, FaSkull } from 'react-icons/fa';

const mockStore = configureMockStore([thunk]);

describe('<Upload>', () => {
    it('should render component with correct elements', () => {
        const store = mockStore(mockState);
        const wrapper = mount(
            <Router>
                <Provider store={store}>
                    <Upload />
                </Provider>
            </Router>
        );
        expect(wrapper.find(Grid).exists()).toBeTruthy();
        expect(wrapper.find('.upload').exists()).toBeTruthy();
        expect(wrapper.find('.upload__icon').exists()).toBeTruthy();
        expect(wrapper.find('.upload__instructions').exists()).toBeTruthy();
    });

    it('should render correct content for initial status', () => {
        const store = mockStore({
            ...mockState,
            upload: {
                status: Statuses.INITIAL,
            },
        });
        const wrapper = mount(
            <Router>
                <Provider store={store}>
                    <Upload />
                </Provider>
            </Router>
        );
        expect(wrapper.find(FaCloudUploadAlt).exists()).toBeTruthy();
        expect(wrapper.find('.upload--initial').exists()).toBeTruthy();
        expect(wrapper.find('.upload__instructions').text()).toBe(
            UploadStatusMessages.INITIAL
        );
    });

    it('should render correct content for error status', () => {
        const store = mockStore({
            ...mockState,
            upload: {
                status: Statuses.ERROR,
            },
        });
        const wrapper = mount(
            <Router>
                <Provider store={store}>
                    <Upload />
                </Provider>
            </Router>
        );
        expect(wrapper.find(FaSkull).exists()).toBeTruthy();
        expect(wrapper.find('.upload--error').exists()).toBeTruthy();
        expect(wrapper.find('.upload__instructions').text()).toBe(
            UploadStatusMessages.ERROR
        );
    });

    it('should render correct content for loading status', () => {
        const store = mockStore({
            ...mockState,
            upload: {
                status: Statuses.LOADING,
            },
        });
        const wrapper = mount(
            <Router>
                <Provider store={store}>
                    <Upload />
                </Provider>
            </Router>
        );
        expect(wrapper.find(FaCat).exists()).toBeTruthy();
        expect(wrapper.find('.upload--loading').exists()).toBeTruthy();
        expect(wrapper.find('.upload__instructions').text()).toBe(
            UploadStatusMessages.LOADING
        );
    });
});
