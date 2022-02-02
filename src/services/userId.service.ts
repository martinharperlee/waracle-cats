import { nanoid } from 'nanoid';
import { LocalStorage } from '../enums/localStorage';

export const getUserId = (): string => {
    const storageId = localStorage.getItem(LocalStorage.LOCAL_STORAGE_ID);
    const hasUserId = !!storageId;
    const id = hasUserId ? storageId : nanoid();
    !hasUserId && localStorage.setItem(LocalStorage.LOCAL_STORAGE_ID, id);
    return id;
};
