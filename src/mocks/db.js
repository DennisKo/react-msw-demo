import { factory, primaryKey } from '@mswjs/data';

export const mockUsers = [
  {
    id: '1',
    name: 'Alice',
    email: 'alice@aol.com',
  },
  {
    id: '2',
    name: 'Bob',
    email: 'bob@aol.com',
  },
  {
    id: '3',
    name: 'Dennis',
    email: 'dennis@aol.com',
  },
];

// Create a "db" with an user model and some defaults
export const db = factory({
  user: {
    id: primaryKey(),
    name: () => 'Firstname',
    email: () => 'email@email.com',
  },
});

// create 3 users
mockUsers.forEach((user) => db.user.create(user));
