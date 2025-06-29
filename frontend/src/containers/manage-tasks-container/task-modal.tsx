import { useTasksStore } from './store';
import { TaskForm } from './components/task-form';
import { CommonModal } from '../../components/modal';
import { FORM_MODE } from '../../constants/common';
import { FormProviderWrapper } from '../../components/form/form-provider-wrapper';
import { useTaskForm } from './hooks/use-task-form';
import { Spin } from 'antd';

export const TaskModal = () => {
  const { taskForm, setTaskForm } = useTasksStore((state) => state.taskFormState);

  const { methods, handleSubmit, onSave, reset, isValid, loading } = useTaskForm();
  const onClose = () => {
    setTaskForm({ open: false });
    reset({});
  };
  return (
    <CommonModal
      title={taskForm.type === FORM_MODE.CREATE ? 'Create task' : 'Edit task'}
      width={950}
      onClosed={onClose}
      open={taskForm.open ?? false}
      onSubmitted={handleSubmit(onSave)}
      okButtonProps={{ disabled: !isValid }}
    >
      <Spin spinning={loading}>
        <FormProviderWrapper methods={methods}>
          <TaskForm />
        </FormProviderWrapper>
      </Spin>
    </CommonModal>
  );
};
