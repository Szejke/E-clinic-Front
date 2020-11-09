import {Transfer} from './transfer.model';

export interface Beneficiary {
  id?: string;
  accountIban?: string;
  fullName?: string;
  address?: string;
  transfer?: Transfer;
}
