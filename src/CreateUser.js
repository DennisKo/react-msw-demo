import { useMutation, useQueryClient } from 'react-query';
import { api } from './api';

async function createUser(newUser) {
  try {
    return api(`/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });
  } catch (error) {
    throw new Error(`Error creating User with Id ${newUser.id}: `, error);
  }
}

export function CreateUser() {
  const queryClient = useQueryClient();
  const createUserMutation = useMutation((newUser) => createUser(newUser), {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    },
  });

  return (
    <button
      onClick={() =>
        createUserMutation.mutate({
          id: '4',
          name: 'John',
          email: 'john@aol.com',
        })
      }
    >
      Create new User
    </button>
  );
}
