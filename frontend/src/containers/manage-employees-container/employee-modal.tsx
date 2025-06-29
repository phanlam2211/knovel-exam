import { useEmployeesStore } from './store';
import { EmployeeForm } from './components/employee-form';
import { CommonModal } from '../../components/modal';
import { FORM_MODE } from '../../constants/common';
import { FormProviderWrapper } from '../../components/form/form-provider-wrapper';
import { useEmployeeForm } from './hooks/use-employee-form';
import { Spin } from 'antd';

export const EmployeeModal = () => {
  const { employeeForm, setEmployeeForm } = useEmployeesStore((state) => state.employeeFormState);

  const { methods, handleSubmit, onSave, reset, isValid, loading } = useEmployeeForm();
  const onClose = () => {
    setEmployeeForm({ open: false });
    reset({});
  };
  return (
    <CommonModal
      title={employeeForm.type === FORM_MODE.CREATE ? 'Create Employee' : 'Edit Employee'}
      width={600}
      onClosed={onClose}
      open={employeeForm.open ?? false}
      onSubmitted={handleSubmit(onSave)}
      okButtonProps={{ disabled: !isValid }}
    >
      <Spin spinning={loading}>
        <FormProviderWrapper methods={methods}>
          <EmployeeForm />
        </FormProviderWrapper>
      </Spin>
    </CommonModal>
  );
};