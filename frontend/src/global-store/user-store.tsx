import { withLenses } from '@dhmk/zustand-lens';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { asyncLens } from '../helpers/zustand';
import { authService, User } from '../swagger-api';

export const useInfoCurrentUserStore = create(
  immer(
    withLenses({
      asycnFetchCurrentUser: asyncLens(async () => {
        const res = await authService.authControllerMe();
        localStorage.setItem('currentUser', JSON.stringify(res.data));
        return res.data;
      }, {} as User),
    }),
  ),
);
