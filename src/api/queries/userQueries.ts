import { useQuery } from '@tanstack/react-query';

import { fetchUser, fetchUsers } from '@/api/services/userServices';

import { User } from '@/types/userTypes';

export const useFetchUserQuery = (login: User['login']) =>
  useQuery({
    queryKey: ['user', login],
    queryFn: () => fetchUser(login),
    enabled: !!login,
  });

export const useFetchUsersQuery = () =>
  useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
