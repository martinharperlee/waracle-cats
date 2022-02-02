import React from 'react';
import './Grid.scss';

export const Grid: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <section className="grid" aria-label="List of cat images">
        {children}
    </section>
);

export default Grid;
