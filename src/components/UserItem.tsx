import { VFC, memo, Dispatch, SetStateAction } from "react";
import { Users, DeleteUserMutationFn } from "src/types/generated/graphql";

interface Props {
  user: { __typename?: "users" } & Pick<Users, "id" | "name" | "created_at">;
  delete_users_by_pk: DeleteUserMutationFn;
  setEditedUser: Dispatch<
    SetStateAction<{
      id: string;
      name: string;
    }>
  >;
}

export const UserItem: VFC<Props> = memo((props) => {
  const { user, delete_users_by_pk, setEditedUser } = props;
  console.log("UserItem rendered!");

  return (
    <div>
      <p>{user.name}</p>
      <p>{user.created_at}</p>
      <button
        className="mr-1 py-1 px-3 text-white bg-green-700 rounded-2xl focus:outline-none"
        data-testid={`edit-${user.id}`}
        onClick={() => setEditedUser(user)}
      >
        Edit
      </button>
      <button
        className="mr-1 py-1 px-3 text-white bg-red-700 rounded-2xl focus:outline-none"
        data-testid={`edit-${user.id}`}
        onClick={async () =>
          await delete_users_by_pk({
            variables: {
              id: user.id,
            },
          })
        }
      >
        Delete
      </button>
    </div>
  );
});
