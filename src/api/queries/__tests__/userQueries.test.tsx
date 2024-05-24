import { renderHook } from '@testing-library/react-hooks';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import {
  useFetchUsersQuery,
  useFetchUserQuery,
} from '@/api/queries/userQueries';

jest.mock('@/api/services/userServices.ts', () => ({
  fetchUsers: () => 'users',
  fetchUser: () => 'user',
}));

interface WrapperProps {
  children: React.ReactNode;
}

const wrapper: React.FC<WrapperProps> = ({ children }) => (
  <QueryClientProvider client={new QueryClient({})}>
    {children}
  </QueryClientProvider>
);

describe('studyQueries', () => {
  it('should call fetchUsers', async () => {
    const { result, waitFor } = renderHook(() => useFetchUsersQuery(), {
      wrapper,
    });
    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual('users');
  });

  it('should call fetchUsers', async () => {
    const { result, waitFor } = renderHook(() => useFetchUserQuery('1'), {
      wrapper,
    });
    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual('user');
  });
});
