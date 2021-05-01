import { setupServer } from 'msw/node';
import { db } from './db';

// for node/test environments
export const server = setupServer(...db.user.toHandlers('rest', 'http://localhost:8000/api/'));
