import { lens, withLenses } from '@dhmk/zustand-lens';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { asyncLens } from '../../helpers/zustand/async-lens';
import { Task, taskService, usersService } from '../../swagger-api';
import { FormModeType } from '../../constants/common';

type TaskProps = {
  taskForm: TaskFormProps;
  setTaskForm: (taskForm: TaskFormProps) => void;
};

type TaskFormProps = {
  open?: boolean;
  task?: Task | null;
  type?: FormModeType;
};

export const useTasksStore = create(
  immer(
    withLenses({
      taskFormState: lens<TaskProps>((set) => ({
        taskForm: {} as TaskFormProps,
        setTaskForm: (taskForm: TaskFormProps) => {
          set((state: TaskProps) => {
            state.taskForm = taskForm;
          });
        },
      })),
      asyncTasksList: asyncLens(
        async (props: { page: number; size: number; assigneeId: number; statusId: number; sortBy: string; sortOrder: string }) => {
          const { page, size, assigneeId, statusId, sortBy, sortOrder } = props;

          const res = await taskService.tasksControllerFindAll({
            page: page,
            limit: size,
            assigneeId,
            statusId,
            sortBy: sortBy as any,
            sortOrder: sortOrder as any,
          });
          return res.data;
        },
        {
          total: 0,
          data: [],
        },
      ),

      asyncGetAllEmployee: asyncLens(async () => {
        //we can improve with api with paginate and search if employee count > 1000
        const res = await usersService.usersControllerFindAllEmployees();
        return res.data;
      }, []),
    }),
  ),
);
