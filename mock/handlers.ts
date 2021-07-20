import { graphql } from "msw";
export const handlers = [
  graphql.query("GetUsers", (req, res, ctx) => {
    return res(
      ctx.data({
        users: [
          {
            __typename: "users",
            id: "02595997-1f37-471e-b555-566913dbc510",
            name: "Test user A",
            created_At: "2021-07-19T03:47:10.310815+00:00",
          },
          {
            __typename: "users",
            id: "72e92b6d-4660-4c00-ae49-5c0f8a381cbf",
            name: "Test user B",
            created_At: "2021-08-19T03:47:13.846089+00:00",
          },
          {
            __typename: "users",
            id: "e8641613-cb28-46e0-995d-0a08d2fe9900",
            name: "Test user C",
            created_At: "2021-09-19T03:47:18.443011+00:00",
          },
        ],
      })
    );
  }),
  graphql.query("GetUserIDs", (req, res, ctx) => {
    return res(
      ctx.data({
        users: [
          {
            __typename: "users",
            id: "02595997-1f37-471e-b555-566913dbc510",
          },
          {
            __typename: "users",
            id: "72e92b6d-4660-4c00-ae49-5c0f8a381cbf",
          },
          {
            __typename: "users",
            id: "e8641613-cb28-46e0-995d-0a08d2fe9900",
          },
        ],
      })
    );
  }),
  graphql.query("GetUserById", (req, res, ctx) => {
    const { id } = req.variables;
    if (id === "02595997-1f37-471e-b555-566913dbc510") {
      return res(
        ctx.data({
          users_by_pk: {
            __typename: "users",
            id: "02595997-1f37-471e-b555-566913dbc510",
            name: "Test user A",
            created_At: "2021-07-19T03:47:10.310815+00:00",
          },
        })
      );
    }
    if (id === "72e92b6d-4660-4c00-ae49-5c0f8a381cbf") {
      return res(
        ctx.data({
          users_by_pk: {
            __typename: "users",
            id: "72e92b6d-4660-4c00-ae49-5c0f8a381cbf",
            name: "Test user B",
            created_At: "2021-08-19T03:47:13.846089+00:00",
          },
        })
      );
    }
    if (id === "e8641613-cb28-46e0-995d-0a08d2fe9900") {
      return res(
        ctx.data({
          users_by_pk: {
            __typename: "users",
            id: "e8641613-cb28-46e0-995d-0a08d2fe9900",
            name: "Test user C",
            created_At: "2021-09-19T03:47:18.443011+00:00",
          },
        })
      );
    }
  }),
];
