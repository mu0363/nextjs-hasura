import { VFC } from "react";
import Link from "next/link";
import { GetStaticProps, GetStaticPaths } from "next";
import { Layout } from "src/components/Layout";
import { ChevronDoubleLeftIcon } from "@heroicons/react/solid";
import { initializeApollo } from "src/lib/apolloClient";
import { GET_USERBY_ID, GET_USERIDS } from "src/queries/queries";
import {
  GetUserByIdQuery,
  GetUserIdsQuery,
  Users,
} from "src/types/generated/graphql";

interface Props {
  user: { __typename?: "users" } & Pick<Users, "id" | "name" | "created_at">;
}

const UserDetail: VFC<Props> = ({ user }) => {
  if (!user) {
    return (
      <Layout title="User detail">
        <p>Loading...</p>
      </Layout>
    );
  }

  return (
    <Layout title="User Detail">
      <p className="my-1 font-bold">User detail</p>
      <p>{user.id}</p>
      <p>{user.name}</p>
      <p>{user.created_at}</p>
      <Link href="/hasura-ssg">
        <div className="flex mt-12">
          <ChevronDoubleLeftIcon
            data-testid="auth-to-domain"
            className="h-5 w-5 mr-3 text-blue-500"
          />
          <span data-testid="back-to-main">Back to main ssg-page</span>
        </div>
      </Link>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query<GetUserIdsQuery>({
    query: GET_USERIDS,
  });
  const paths = data.users.map((user) => ({
    params: {
      id: user.id,
    },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query<GetUserByIdQuery>({
    query: GET_USERBY_ID,
    variables: { id: params.id },
  });

  return {
    props: {
      user: data.users_by_pk,
    },
    revalidate: 1,
  };
};

export default UserDetail;
