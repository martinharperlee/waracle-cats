import React, { useState } from 'react';
import { FaCat } from 'react-icons/fa';
import classList from '../../utils/classList';
import Favourite from '../favourites/Favourite';
import Votes from '../votes/Votes';
import './Cat.scss';

interface CatProps {
    url: string;
    id: string;
}

export const Cat: React.FC<CatProps> = ({ id, url }) => {
    const [isLoaded, setLoaded] = useState(false);
    const componentStyle = classList({
        cat: true,
        'cat--loaded': isLoaded,
    });

    return (
        <article className={componentStyle}>
            <div className="cat__wrapper">
                <Favourite imageId={id} />
                <Votes imageId={id} />
                <FaCat className="cat__icon" />
                <img
                    src={url}
                    alt={`cat id: ${id}`}
                    className="cat__image"
                    loading="lazy"
                    width="455"
                    height="455"
                    onLoad={() => setLoaded(true)}
                />
            </div>
        </article>
    );
};

export default Cat;
