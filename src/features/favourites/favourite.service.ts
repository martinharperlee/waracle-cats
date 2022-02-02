import {
    deleteRequest,
    getRequest,
    postRequest,
} from '../../services/api.service';
import { getUserId } from '../../services/userId.service';

export const getFavourites = () =>
    getRequest(`favourites?sub_id=${getUserId()}`);

export const addFavourite = (imageId: string) => {
    const body = JSON.stringify({
        sub_id: getUserId(),
        image_id: imageId,
    });
    return postRequest('favourites', body);
};

export const deleteFavourite = (id: number) =>
    deleteRequest(`favourites/${encodeURIComponent(id)}`);
