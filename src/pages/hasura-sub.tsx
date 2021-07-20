import { VFC } from "react";
import Link from "next/link";
import { Layout } from "src/components/Layout";
import { useQuery } from "@apollo/client";
import { GET_USERS, GET_USERS_LOCAL } from "src/queries/queries";
import { GetUsersQuery } from "src/types/generated/graphql";

const FetchSub: VFC = () => {
  const { data, error, loading } = useQuery<GetUsersQuery>(GET_USERS_LOCAL);

  if (loading) {
    return (
      <Layout title="Hasura FetchPolicy">
        <p>Loading...</p>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="Hasura FetchPolicy">
        <p>Error: {error.message}</p>
      </Layout>
    );
  }

  return (
    <Layout title="Hasura fetchPolicy read cache">
      <p className="mb-6 font-bold">Direct read out from cache</p>
      {data?.users.map((user) => (
        <p className="my-1" key={user.id}>
          {user.name}
        </p>
      ))}
      <Link href="/hasura-main">
        <a className="mt-6">Back</a>
      </Link>
    </Layout>
  );
};

export default FetchSub;
