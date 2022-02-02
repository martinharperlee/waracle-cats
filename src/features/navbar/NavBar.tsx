import React from 'react';
import { Link } from 'react-router-dom';
import { Paths } from '../../enums/paths';
import { FaCat, FaPlus } from 'react-icons/fa';
import { useAppSelector } from '../../app/hooks';
import { selectCatsAreLoading } from '../cats/cats.slice';
import './NavBar.scss';
import classList from '../../utils/classList';

export const NavBar: React.FC = () => {
    const isLoading = useAppSelector(selectCatsAreLoading);
    const componentStyle = classList({
        navbar: true,
        'navbar--isLoading': isLoading,
    });

    return (
        <nav className={componentStyle} role="navigation" aria-label="primary">
            <Link to={Paths.home} className="navbar__link" aria-label="Cats">
                <FaCat className="navbar__icon navbar__cat" />
            </Link>
            <Link
                to={Paths.upload}
                className="navbar__link"
                aria-label="Upload a cats"
            >
                <FaPlus className="navbar__icon" />
            </Link>
        </nav>
    );
};

export default NavBar;
