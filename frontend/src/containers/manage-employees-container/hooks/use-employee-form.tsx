import { useEffect, useState } from 'react';
import { useHookForm } from '../../../components/form/hooks/use-hook-form';
import { FORM_MODE } from '../../../constants/common';
import yup from '../../../helpers/yup';
import { useEmployeesStore } from '../store';
import { openNotification } from '../../../components';
import { handleApiError } from '../../../helpers';
import { usersService } from '../../../swagger-api';

export const useEmployeeForm = () => {
  const { asyncEmployeesList, employeeFormState } = useEmployeesStore((state) => state);
  const { employeeForm, setEmployeeForm } = employeeFormState;
  const [loading, setLoading] = useState(false);

  const createSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const updateSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().optional(),
  });

  const schema = employeeForm.type === FORM_MODE.CREATE ? createSchema : updateSchema;

  const { methods, handleSubmit, isValid, reset } = useHookForm({
    schema: schema,
  });

  const onSave = async (data: any) => {
    try {
      setLoading(true);
      if (employeeForm.type === FORM_MODE.CREATE) {
        // TODO: Implement create when API is available
        await usersService.usersControllerCreate(data);
        openNotification('success', 'Create employee success');
      } else if (employeeForm.type === FORM_MODE.EDIT && employeeForm.employee) {
        await usersService.usersControllerUpdate(data.id, data);
        openNotification('success', 'Updated employee success');
      }
    } catch (err: any) {
      handleApiError(err);
    } finally {
      setLoading(false);
      setEmployeeForm({
        open: false,
        employee: null,
      });
      asyncEmployeesList.execute();
    }
  };

  useEffect(() => {
    if (employeeForm.open) {
      if (employeeForm.type === FORM_MODE.EDIT && employeeForm.employee) {
        reset({
          ...employeeForm.employee,
        });
      } else if (employeeForm.type === FORM_MODE.CREATE) {
        reset({});
      }
    } else {
      reset({});
    }
  }, [employeeForm.open, employeeForm.type, employeeForm.employee, reset]);

  return {
    methods,
    handleSubmit,
    isValid,
    reset,
    onSave,
    loading,
  };
};