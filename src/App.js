import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Users } from './Users';
import { User } from './User';

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser');
  worker.start();
}

const queryClient = new QueryClient();

function App() {
  const [selectedUser, setSelectedUser] = useState(null);
  return (
    <QueryClientProvider client={queryClient}>
      {selectedUser ? (
        <User userId={selectedUser.id} setSelectedUser={setSelectedUser} />
      ) : (
        <Users setSelectedUser={setSelectedUser} />
      )}
    </QueryClientProvider>
  );
}

export default App;
