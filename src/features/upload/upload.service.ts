import { postDataRequest } from '../../services/api.service';
import { getUserId } from '../../services/userId.service';

export const uploadImage = (image: File) => {
    const data = new FormData();
    data.append('sub_id', getUserId());
    data.append('file', image);
    return postDataRequest('images/upload', data);
};
