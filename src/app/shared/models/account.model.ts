import {User} from './user.model';
import {Transfer} from './transfer.model';

export interface Account {
  id?: string;
  iban?: string;
  name?: string;
  balance?: number;
  user?: User;
  transfers?: Transfer[];
}
