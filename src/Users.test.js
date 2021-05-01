import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { rest } from 'msw';
import { Users } from './Users';
import { mockUsers } from './mocks/db';
import { server } from './mocks/server';

describe('Users', () => {
  test('renders loading', async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <Users />
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(screen.getByText('Loading Users...')).toBeInTheDocument();
    });
  });

  test('lists users', async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <Users />
      </QueryClientProvider>
    );

    await waitFor(() => {
      mockUsers.forEach((mockUser) => {
        expect(screen.getByText(mockUser.name, { exact: false })).toBeInTheDocument();
      });
    });
  });

  test('create new user', async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <Users />
      </QueryClientProvider>
    );

    const createButton = await screen.findByText('Create new User');

    fireEvent.click(createButton);

    const newUserInList = await screen.findByText('Name: John');
    expect(newUserInList).toBeInTheDocument();
  });

  test('renders Error', async () => {
    server.use(
      rest.get('http://localhost:8000/api/users/', (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({
            errorMessage: `Internal Server Error`,
          })
        );
      })
    );
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false, // disable retries to force an error response
        },
      },
    });
    render(
      <QueryClientProvider client={queryClient}>
        <Users />
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(screen.getByText('Oops, something went wrong!')).toBeInTheDocument();
    });
  });
});
