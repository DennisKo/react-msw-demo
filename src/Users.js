import { useQuery } from 'react-query';
import { CreateUser } from './CreateUser';
import { api } from './api';

async function getUsers() {
  try {
    return api(`/users/`);
  } catch (error) {
    throw new Error(`Error fetching Users`, error);
  }
}

export function Users({ setSelectedUser }) {
  const { isLoading, data: users, isError } = useQuery('users', getUsers);

  if (isError) {
    return <div>Oops, something went wrong!</div>;
  }

  if (isLoading) {
    return <div>Loading Users...</div>;
  }

  return (
    <>
      <div>Users</div>
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={() => setSelectedUser(user)}>
            <div>Name: {user.name}</div>
          </li>
        ))}
      </ul>
      <CreateUser />
    </>
  );
}
