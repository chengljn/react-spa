'use client';

import Link from 'next/link';
import React, { useState } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Loading from '@/components/ui/loading';

import { useFetchUsersQuery } from '@/api/queries/userQueries';

import { User } from '@/types/userTypes';

export default function UserTable() {
  const [inputVal, setInputVal] = useState('');

  const { data, isLoading } = useFetchUsersQuery();

  const _onInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputVal(e.target.value);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex w-full flex-col">
      <input
        className="m-auto w-1/2 rounded-md border-2 border-gray-400 p-2 focus:border-teal-500 focus:outline-none"
        type="text"
        placeholder="Search"
        value={inputVal}
        onChange={_onInputChange}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Avatar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data
            ?.filter(
              (value: User) =>
                !value.login.toLowerCase().indexOf(inputVal.toLowerCase()),
            )
            .map((value: User) => (
              <TableRow key={value.login}>
                <TableCell>{value.login}</TableCell>
                <TableCell>
                  <img
                    src={value.avatar_url}
                    alt="avatar_url"
                    className="h-16 w-16 rounded"
                  />
                </TableCell>
                <TableCell>
                  <Link href={`/${value.login}`}>
                    <div className="inline-flex items-center space-x-0.5">
                      <span className="group-hover:underline">
                        {'Detail ->'}
                      </span>
                    </div>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
