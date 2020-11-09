import {Account} from './account.model';
import {TransferType} from './transfer-type.model';
import {Beneficiary} from './beneficiary.model';

export enum TransferStatuses {
  CREATED = 0,
  EXECUTED = 1,
  CANCELLED = 2,
  SAVED = 3,
  ACCEPTED = 4,
}

export enum TransferStatusesNames {
  CREATED = 'Stworzony',
  EXECUTED = 'Wykonany',
  CANCELLED = 'Anulowany',
  SAVED = 'W trakcie realizacji',
  ACCEPTED = 'Przyjęty',
}

export const TRANSFER_STATUSES_NAMES: Map<number, string> = new Map( [
  [TransferStatuses.CREATED.valueOf(), TransferStatusesNames.CREATED],
  [TransferStatuses.EXECUTED.valueOf(), TransferStatusesNames.EXECUTED],
  [TransferStatuses.CANCELLED.valueOf(), TransferStatusesNames.CANCELLED],
  [TransferStatuses.SAVED.valueOf(), TransferStatusesNames.SAVED],
  [TransferStatuses.ACCEPTED.valueOf(), TransferStatusesNames.ACCEPTED],
]);

export class Transfer {
  id?: string;
  transactionDate?: Date;
  title?: string;
  amount?: number;
  type?: TransferType;
  beneficiary?: Beneficiary;
  account?: Account;
  status?: number;
}
