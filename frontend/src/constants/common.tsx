export const FORM_MODE = {
  VIEW: 'VIEW',
  EDIT: 'EDIT',
  CREATE: 'CREATE',
};

export const STATUS_TASK = {
  TODO: "Todo",
  PENDING: 'Pending',
  INPROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
};

export type FormModeType = (typeof FORM_MODE)[keyof typeof FORM_MODE];

export const ROLES = {
  EMPLOYEE: 'EMPLOYEE',
  EMPLOYER: 'EMPLOYER',
};

export  const STATUS_OPTIONS = [
  { value: 1, label: 'Todo' },
  { value: 2, label: 'Pending' },
  { value: 3, label: 'In Progress' },
  { value: 4, label: 'Completed' },
  { value: 5, label: 'Cancelled' },
];