import React from 'react';
import { mount } from 'enzyme';
import Grid from './Grid';

describe('<Grid />', () => {
    it('render grid', () => {
        const wrapper = mount(
            <Grid>
                <p>test</p>
            </Grid>
        );
        expect(wrapper.find('.grid').exists()).toBeTruthy();
        expect(wrapper.find('p').exists()).toBeTruthy();
    });
});
