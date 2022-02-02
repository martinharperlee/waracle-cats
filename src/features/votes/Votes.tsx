import React from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    selectUserVote,
    selectVoteCount,
    changeVote,
    selectChangeVoteIsLoading,
} from './votes.slice';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import './Votes.scss';
import classList from '../../utils/classList';

interface VotesProps {
    imageId: string;
}

export const Votes: React.FC<VotesProps> = ({ imageId }) => {
    const dispatch = useAppDispatch();
    const count = useAppSelector(selectVoteCount(imageId));
    const changeIsLoading = useAppSelector(selectChangeVoteIsLoading(imageId));
    const userVote = useAppSelector(selectUserVote(imageId));
    const onClick = (value: number) => {
        dispatch(changeVote({ userVote, value, imageId }));
    };
    const componentStyle = classList({
        votes: true,
        'votes--loading': changeIsLoading,
    });
    const isDisabled = (value: 1 | 0) =>
        changeIsLoading || (userVote && userVote.value === value);

    return (
        <div className={componentStyle}>
            <button
                aria-label="Thumbs up for this cat"
                disabled={isDisabled(0)}
                className="votes__btn votes__up"
                onClick={() => onClick(0)}
            >
                <FaThumbsDown className="votes__icon" />
            </button>
            <div className="votes__count">{count}</div>
            <button
                aria-label="Thumbs down for this cat"
                disabled={isDisabled(1)}
                className="votes__btn votes__down"
                onClick={() => onClick(1)}
            >
                <FaThumbsUp className="votes__icon" />
            </button>
        </div>
    );
};

export default Votes;
