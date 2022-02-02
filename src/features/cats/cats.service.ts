import { getRequest } from '../../services/api.service';

export const getImages = () => getRequest('images?limit=100');
