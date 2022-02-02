import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import Grid from '../grid/Grid';
import Cat from './Cat';
import { loadCats, selectCats } from './cats.slice';
import { loadFavourites } from '../favourites/favourite.slice';
import { loadVotes } from '../votes/votes.slice';
import { Image } from '../../types/image.type';

export const Cats: React.FC = () => {
    const dispatch = useAppDispatch();
    const cats = useAppSelector(selectCats);

    useEffect(() => {
        dispatch(loadCats());
        dispatch(loadFavourites());
        dispatch(loadVotes());
    }, [dispatch]);

    const getCat = (img: Image) => (
        <Cat key={img.id} id={img.id} url={img.url} />
    );

    return <Grid>{cats.map((cat) => getCat(cat))}</Grid>;
};

export default Cats;
