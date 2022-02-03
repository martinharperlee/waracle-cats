import { Statuses as s } from '../enums/status';

export type Status = s.INITIAL | s.ERROR | s.LOADING | s.SUCCESS;
