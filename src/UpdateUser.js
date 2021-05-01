import { useMutation, useQueryClient } from 'react-query';
import { api } from './api';

async function updateUser(userId, newUserInfo) {
  try {
    return api(`/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUserInfo),
    });
  } catch (error) {
    throw new Error(`Error updating User with Id ${userId}: `, error);
  }
}

export function UpdateUser({ userId }) {
  const queryClient = useQueryClient();
  const updateUserMutation = useMutation((newUserInfo) => updateUser(userId, newUserInfo), {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    },
  });

  return (
    <button
      onClick={() =>
        updateUserMutation.mutate({
          name: 'Anna',
        })
      }
    >
      Update User
    </button>
  );
}
