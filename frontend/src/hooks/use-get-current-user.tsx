import { ROLES } from '../constants/common';
import { useInfoCurrentUserStore } from '../global-store/user-store';

export const useGetCurrentUser = () => {
  const { data, loading } = useInfoCurrentUserStore((state) => state.asycnFetchCurrentUser);

  const currentRole = data?.role?.name;
  const isEmployyer = currentRole === ROLES.EMPLOYER;
  const isEmployee = currentRole === ROLES.EMPLOYEE;

  return {
    data,
    loading,
    isEmployyer,
    isEmployee,
    currentRole,
  };
};
