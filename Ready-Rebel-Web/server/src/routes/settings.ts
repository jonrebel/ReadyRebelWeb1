import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

export const settingsRouter = (prisma: PrismaClient) => {
  const router = Router();

  router.get('/', async (_req, res) => {
    let settings = await prisma.settings.findFirst();
    if (!settings) {
      settings = await prisma.settings.create({ data: { theme: 'light', notificationsEnabled: false } });
    }
    res.json(settings);
  });

  router.put('/', async (req, res) => {
  const { theme, notificationsEnabled } = req.body ?? {};
  const data: any = {};
  if (typeof theme === 'string') data.theme = theme;
  if (typeof notificationsEnabled === 'boolean') data.notificationsEnabled = notificationsEnabled;

  let current = await prisma.settings.findFirst();
  if (!current) {
    const created = await prisma.settings.create({ data });
    return res.json(created);
  }
  const updated = await prisma.settings.update({ where: { id: current.id }, data });
  res.json(updated);
});


  return router;
};
