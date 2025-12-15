import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import { chatRouter } from './routes/chat.js';
import { contactsRouter } from './routes/contacts.js';
import { settingsRouter } from './routes/settings.js';

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (_, res) => res.json({ ok: true }));

app.use('/api/chat', chatRouter);
app.use('/api/contacts', contactsRouter(prisma));
app.use('/api/settings', settingsRouter(prisma));

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
