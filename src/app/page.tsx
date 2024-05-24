'use client';

import { useState } from 'react';
import { useRafInterval } from 'ahooks';

import { useFetchUsersQuery } from '@/api/queries/userQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import UserTable from '@/app/components/user-table';

export default function Home() {
  const [randomNumber, setRandomNumber] = useState(
    Math.floor(Math.random() * 25) + 1,
  );
  const { data } = useFetchUsersQuery();

  useRafInterval(() => {
    setRandomNumber(Math.floor(Math.random() * 25) + 1);
  }, 10000);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between space-y-8 px-6 py-5 pb-0 md:p-24">
      <h1 className="text-lg font-semibold md:text-2xl">User List</h1>
      <div className="grid w-full gap-8 md:grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{data?.[randomNumber]?.login}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <img
                src={data?.[randomNumber]?.avatar_url}
                alt="avatar_url"
                className="h-16 w-16 rounded"
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{data?.[randomNumber + 1]?.login}</CardTitle>
          </CardHeader>
          <CardContent>
            {' '}
            <div className="flex justify-center">
              <img
                src={data?.[randomNumber + 1]?.avatar_url}
                alt="avatar_url"
                className="h-16 w-16 rounded"
              />
            </div>
          </CardContent>
        </Card>
      </div>
      <UserTable />
    </main>
  );
}
