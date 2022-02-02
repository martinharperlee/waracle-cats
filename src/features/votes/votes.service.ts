import {
    deleteRequest,
    getRequest,
    postRequest,
} from '../../services/api.service';
import { getUserId } from '../../services/userId.service';

export const getVotes = () => getRequest('votes');
export const addVote = (imageId: string, value: number) => {
    const body = JSON.stringify({
        sub_id: getUserId(),
        image_id: imageId,
        value,
    });
    return postRequest('votes', body);
};

export const deleteVote = (id: number) => {
    return deleteRequest(`votes/${encodeURIComponent(id)}`);
};
