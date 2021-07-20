import { VFC } from "react";
import Link from "next/link";
import { Layout } from "src/components/Layout";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "src/queries/queries";
import { GetUsersQuery } from "src/types/generated/graphql";

const FetchMain: VFC = () => {
  const { data, error, loading } = useQuery<GetUsersQuery>(GET_USERS, {
    // fetchPolicy: "network-only",
    fetchPolicy: "cache-and-network",
    // fetchPolicy: "cache-first",
    // fetchPolicy: "no-cache",
  });

  return (
    <Layout title="Hasura FetchPolicy">
      <p className="p-6 font-bold">Hasura main page</p>
      {console.log(data)}
      {data?.users.map((user) => (
        <p className="my-1" key={user.id}>
          {user.name}
        </p>
      ))}
      <Link href="/hasura-sub">
        <a className="mt-6">Next</a>
      </Link>
    </Layout>
  );
};

export default FetchMain;
