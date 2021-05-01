import { useQuery } from 'react-query';
import { UpdateUser } from './UpdateUser';
import { DeleteUser } from './DeleteUser';
import { api } from './api';

async function getUserById(userId) {
  try {
    return api(`/users/${userId}`);
  } catch (error) {
    throw new Error(`Error fetching User with Id ${userId}: `, error);
  }
}

export function User({ userId, setSelectedUser }) {
  const { isLoading, data: user, isError } = useQuery(['users', userId], () => getUserById(userId));

  if (isError) {
    return <div>Oops, something went wrong!</div>;
  }

  if (isLoading) {
    return <div>Loading User...</div>;
  }

  return (
    <>
      <button onClick={() => setSelectedUser(null)}>Back</button>
      <h3>Selected User</h3>
      <div>Id: {user.id}</div>
      <div>Name: {user.name}</div>
      <div>Email: {user.email}</div>
      <UpdateUser userId={user.id} />
      <DeleteUser userId={user.id} setSelectedUser={setSelectedUser} />
    </>
  );
}
