import React from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    selectFavourite,
    addFav,
    deleteFav,
    selectChangeFavouriteIsLoading,
} from './favourite.slice';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import './Favourite.scss';
import classList from '../../utils/classList';

interface FavouriteProps {
    imageId: string;
}

export const Favourite: React.FC<FavouriteProps> = ({ imageId }) => {
    const dispatch = useAppDispatch();
    const changeIsLoading = useAppSelector(
        selectChangeFavouriteIsLoading(imageId)
    );
    const favourite = useAppSelector(selectFavourite(imageId));
    const icon = favourite ? FaHeart : FaRegHeart;
    const onClick = () =>
        favourite
            ? dispatch(deleteFav({ imageId, id: favourite.id }))
            : dispatch(addFav(imageId));

    const componentStyle = classList({
        favourite: true,
        'favourite--loading': changeIsLoading,
    });

    return (
        <button
            disabled={changeIsLoading}
            className={componentStyle}
            onClick={onClick}
            aria-label="Add this cat to your favourites"
        >
            {React.createElement(icon, { className: 'favourite__icon' })}
        </button>
    );
};

export default Favourite;
