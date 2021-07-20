import { VFC, useState, FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import { Layout } from "src/components/Layout";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_USERS,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
} from "src/queries/queries";
import {
  GetUsersQuery,
  CreateUserMutation,
  UpdateUserMutation,
  DeleteUserMutation,
} from "src/types/generated/graphql";
import { UserItem } from "src/components/UserItem";

const hasuraCrud: VFC = () => {
  const [editedUser, setEditedUser] = useState({ id: "", name: "" });

  const { data, error } = useQuery<GetUsersQuery>(GET_USERS, {
    fetchPolicy: "cache-and-network",
  });

  const [update_users_by_pk] = useMutation<UpdateUserMutation>(UPDATE_USER);

  const [insert_users_one] = useMutation<CreateUserMutation>(CREATE_USER, {
    update(cache, { data: { insert_users_one } }) {
      const cacheId = cache.identify(insert_users_one);
      cache.modify({
        fields: {
          users(existingUsers, { toReference }) {
            return [toReference(cacheId), ...existingUsers];
          },
        },
      });
    },
  });

  const [delete_users_by_pk] = useMutation<DeleteUserMutation>(DELETE_USER, {
    update(cache, { data: { delete_users_by_pk } }) {
      cache.modify({
        fields: {
          users(existingUsers, { readField }) {
            return existingUsers.filter(
              (user) => delete_users_by_pk.id !== readField("id", user)
            );
          },
        },
      });
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editedUser.id) {
      try {
        await update_users_by_pk({
          variables: {
            id: editedUser.id,
            name: editedUser.name,
          },
        });
      } catch (error) {
        alert(error.message);
      }
      setEditedUser({ id: "", name: "" });
    } else {
      try {
        await insert_users_one({
          variables: {
            name: editedUser.name,
          },
        });
      } catch (error) {
        alert(error.message);
      }
      setEditedUser({ id: "", name: "" });
    }
  };

  if (error) {
    return (
      <Layout title="Hasura FetchPolicy">
        <p>Error: {error.message}</p>
      </Layout>
    );
  }

  return (
    <Layout title="hasura CRUD">
      <p className="mb-3 font-bold">Hasura CRUD</p>
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={handleSubmit}
      >
        <input
          className="px-3 py-2 border border-gray-300"
          placeholder="New user"
          type="text"
          value={editedUser.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEditedUser({ ...editedUser, name: e.target.value })
          }
        />
        <button
          disabled={!editedUser.name}
          className="disabled:opacity-40 mb-3 py-1 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl focus:outline-none"
          data-testid="new"
          type="submit"
        >
          {editedUser.id ? "Update" : "Create"}
        </button>
      </form>
      {data?.users.map((user) => (
        <UserItem
          key={user.id}
          user={user}
          delete_users_by_pk={delete_users_by_pk}
          setEditedUser={setEditedUser}
        />
      ))}
    </Layout>
  );
};

export default hasuraCrud;
