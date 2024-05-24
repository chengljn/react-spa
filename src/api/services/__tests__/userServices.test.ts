import { fetchUsers, fetchUser } from '@/api/services/userServices';

import { User } from '@/types/userTypes';

type Params = { [k: string]: string };

jest.mock('axios');

const axios = require('axios');

describe('userServices', () => {
  const cases = [
    {
      name: 'fetchUsers',
      method: fetchUsers,
    },
    {
      name: 'fetchUser',
      method: fetchUser,
      params: '1' as User['login'],
    },
  ];
  const data = 'foo';
  axios.get.mockResolvedValue({ data });

  cases.forEach(({ method, params }) => {
    describe(method.name, () => {
      it('should call client with correct params', async () => {
        const response = await method(params as Params & number & string);

        expect(response).toEqual(data);
      });
    });
  });
});
