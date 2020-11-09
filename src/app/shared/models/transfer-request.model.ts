export interface TransferRequest {
  accountId?: string;
  beneficiaryName?: string;
  beneficiaryAccountIban?: string;
  beneficiaryAddress?: string;
  transferTypeId?: string;
  amount?: number;
  title?: string;
  date?: string;
  emailConfirm?: boolean;
  email?: string;
  userId?: string;
  token?: string;
}
