import { useEffect, useState } from 'react';
import { useHookForm } from '../../../components/form/hooks/use-hook-form';
import { FORM_MODE } from '../../../constants/common';
import yup from '../../../helpers/yup';
import { taskService } from '../../../swagger-api';
import { useTasksStore } from '../store';
import { openNotification } from '../../../components';
import { Formatter, handleApiError } from '../../../helpers';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from '../../../constants';
import { useGetCurrentUser } from '../../../hooks/use-get-current-user';

export const useTaskForm = () => {
  const { asyncTasksList, taskFormState } = useTasksStore((state) => state);
  const { isEmployee } = useGetCurrentUser();
  const { taskForm, setTaskForm } = taskFormState;
  const [loading, setLoading] = useState(false);
  const schema = yup.object().shape({
    title: yup.string().required('Title is required'),
    description: yup.string().nullable(),
    statusId: yup.number().nullable(),
    assigneeId: yup.number().required('Assignee is required'),
    dueDate: yup.string().required('Due date is required'),
  });

  const { methods, handleSubmit, isValid, reset } = useHookForm({
    schema: schema,
  });
  const onSave = async (data: any) => {
    try {
      setLoading(true);
      if (taskForm.type === FORM_MODE.CREATE) {
        await taskService.tasksControllerCreate(data);
        openNotification('success', 'Create task success');
      } else {
        let payload = { ...data };
        if (isEmployee) {
          payload = { status: data.status };
        }
        await taskService.tasksControllerUpdate(data.id, payload);
        openNotification('success', 'Updated task success');
      }
    } catch (err: any) {
      handleApiError(err);
    } finally {
      setLoading(false);
      setTaskForm({
        open: false,
        task: null,
      });
      asyncTasksList.execute({
        page: DEFAULT_PAGE_NUMBER,
        size: DEFAULT_PAGE_SIZE,
      });
    }
  };
  useEffect(() => {
    if (taskForm.open) {
      if (taskForm.type == FORM_MODE.EDIT) {
        reset({
          ...taskForm.task,
          dueDate: Formatter.date(taskForm.task?.dueDate),
        });
      }
    }
  }, [taskForm.open]);

  useEffect(() => {
    if (taskForm.open && taskForm.type === FORM_MODE.CREATE) {
      reset({});
    }
  }, [taskForm.open, taskForm.type]);
  return {
    methods,
    handleSubmit,
    isValid,
    reset,
    onSave,
    loading,
  };
};
