'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useFetchUserQuery } from '@/api/queries/userQueries';
import Loading from '@/components/ui/loading';

export default function UserPage() {
  const { id } = useParams();

  const { data, isLoading } = useFetchUserQuery(id.toString());

  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-8">
      <Link href="/">
        <div className="inline-flex items-center space-x-0.5">
          <span className="group-hover:underline">{'<- Back'}</span>
        </div>
      </Link>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <Card>
            <CardHeader>
              <CardTitle>{data?.login}</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={data?.avatar_url}
                alt="avatar_url"
                className="h-32 w-32 rounded"
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
