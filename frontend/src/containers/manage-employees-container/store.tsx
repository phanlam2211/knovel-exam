import { lens, withLenses } from '@dhmk/zustand-lens';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { asyncLens } from '../../helpers/zustand/async-lens';
import { User, usersService } from '../../swagger-api';
import { FormModeType } from '../../constants/common';

type EmployeeProps = {
  employeeForm: EmployeeFormProps;
  setEmployeeForm: (employeeForm: EmployeeFormProps) => void;
};

type EmployeeFormProps = {
  open?: boolean;
  employee?: User | null;
  type?: FormModeType;
};

export const useEmployeesStore = create(
  immer(
    withLenses({
      employeeFormState: lens<EmployeeProps>((set) => ({
        employeeForm: {} as EmployeeFormProps,
        setEmployeeForm: (employeeForm: EmployeeFormProps) => {
          set((state: EmployeeProps) => {
            state.employeeForm = employeeForm;
          });
        },
      })),
      asyncEmployeesList: asyncLens(async () => {
        const res = await usersService.usersControllerFindAllEmployees();
        return res.data;
      }, [] as User[]),
    }),
  ),
);