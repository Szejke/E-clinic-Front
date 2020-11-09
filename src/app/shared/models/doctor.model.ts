import {User} from './user.model';

export interface Doctor extends User {
  specialization?: string;
}
