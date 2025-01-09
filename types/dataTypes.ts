export type User = {
  id: string;
  schoolId: string;
  accessCodesId: string;
  firstName: string;
  lastName: string;
  email: string;
  date: string;
  status: string;
  payment: string;
  price: number;
  endDate: string | null;
  cancellationDate: string | null;
  nextPaymentDate: string | null;
};
