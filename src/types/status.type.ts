import { Statuses as us } from '../enums/status';

export type Status = us.INITIAL | us.ERROR | us.LOADING | us.SUCCESS;
