import { setupWorker } from 'msw';
import { db } from './db';

// for browser environments
export const worker = setupWorker(...db.user.toHandlers('rest', 'http://localhost:8000/api/'));
