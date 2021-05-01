import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { User } from './User';
import { mockUsers } from './mocks/db';

describe('User', () => {
  test('renders  user info', async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <User userId={mockUsers[1].id} />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(`Name: ${mockUsers[1].name}`)).toBeInTheDocument();
      expect(screen.getByText(`Email: ${mockUsers[1].email}`)).toBeInTheDocument();
      expect(screen.getByText(`Id: ${mockUsers[1].id}`)).toBeInTheDocument();
    });
  });

  test('renders loading', async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <User userId={mockUsers[1].id} />
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(screen.getByText('Loading User...')).toBeInTheDocument();
    });
  });

  test('renders Error (userId undefined)', async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false, // disable retries to force an error response
        },
      },
    });
    render(
      <QueryClientProvider client={queryClient}>
        <User />
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(screen.getByText('Oops, something went wrong!')).toBeInTheDocument();
    });
  });

  test('update user', async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <User userId={mockUsers[1].id} setSelectedUser={jest.fn} />
      </QueryClientProvider>
    );

    // update that user
    const updateButton = await screen.findByText('Update User');
    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(screen.getByText(`Name: Anna`)).toBeInTheDocument(); // hardcoded new user name
    });
  });

  test('delete user', async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <User userId={mockUsers[1].id} setSelectedUser={jest.fn} />
      </QueryClientProvider>
    );

    // delete that user
    const deleteButton = await screen.findByText('Delete User');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(
        screen.queryByText(`User with Id ${mockUsers[1].id} successfully deleted!`)
      ).toBeInTheDocument();
    });
  });
});
