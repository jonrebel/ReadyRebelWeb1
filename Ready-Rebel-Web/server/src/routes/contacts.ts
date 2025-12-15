import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

export const contactsRouter = (prisma: PrismaClient) => {
  const router = Router();

  router.get('/', async (req, res) => {
    const q = (req.query.q as string | undefined)?.trim();
    const contacts = await prisma.contact.findMany({
      where: q ? { name: { contains: q } } : undefined,
      orderBy: { createdAt: 'desc' }
    });
    res.json(contacts);
  });

  router.post('/', async (req, res) => {
    const contact = await prisma.contact.create({ data: req.body });
    res.status(201).json(contact);
  });

  router.get('/:id', async (req, res) => {
    const found = await prisma.contact.findUnique({ where: { id: req.params.id } });
    if (!found) return res.status(404).json({ error: 'Not found' });
    res.json(found);
  });

  router.put('/:id', async (req, res) => {
    const updated = await prisma.contact.update({ where: { id: req.params.id }, data: req.body });
    res.json(updated);
  });

  router.delete('/:id', async (req, res) => {
    await prisma.contact.delete({ where: { id: req.params.id } });
    res.status(204).send();
  });

  return router;
};
