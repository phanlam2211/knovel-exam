import { withLenses } from '@dhmk/zustand-lens';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { asyncLens } from '../../helpers/zustand/async-lens';
import { PaginateEmployeeTaskSummaryDto, taskService } from '../../swagger-api';

export const useEmployeeTaskSummaryStore = create(
  immer(
    withLenses({
      asyncEmployeeTaskSummary: asyncLens(async (props: { page: number; size: number }) => {
        const { page, size } = props;
        const res = await taskService.tasksControllerGetTaskSummary({
          page: page,
          limit: size,
        });
        return res.data;
      }, {} as PaginateEmployeeTaskSummaryDto),
    }),
  ),
);