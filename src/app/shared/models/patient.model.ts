import {User} from './user.model';

export interface Patient extends User {
  pesel?: string;
  address?: string;
  postalCode?: string;
}
