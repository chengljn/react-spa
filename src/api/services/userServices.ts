import axios from 'axios';

import { User } from '@/types/userTypes';

const BASE_URL = 'https://api.github.com/users';

export const fetchUser = async (login: User['login']) => {
  const { data } = await axios.get(`${BASE_URL}/${login}`);

  return data;
};

export const fetchUsers = async () => {
  const { data } = await axios.get(BASE_URL);

  return data;
};
