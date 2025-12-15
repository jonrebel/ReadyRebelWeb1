import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

export const conversationsRouter = (prisma: PrismaClient) => {
  const r = Router()

  r.get('/', async (_req, res) => {
    const list = await prisma.conversation.findMany({
      orderBy: { updatedAt: 'desc' },
      select: { id: true, title: true, createdAt: true, updatedAt: true }
    })
    res.json(list)
  })

  r.post('/', async (req, res) => {
    const title = (req.body?.title as string) || 'New Chat'
    const convo = await prisma.conversation.create({ data: { title } })
    res.status(201).json(convo)
  })

  r.get('/:id/messages', async (req, res) => {
    const msgs = await prisma.message.findMany({
      where: { conversationId: req.params.id },
      orderBy: { createdAt: 'asc' }
    })
    res.json(msgs)
  })

  r.put('/:id', async (req, res) => {
    const title = (req.body?.title as string) || 'Untitled'
    const updated = await prisma.conversation.update({
      where: { id: req.params.id },
      data: { title }
    })
    res.json(updated)
  })

  r.delete('/:id', async (req, res) => {
    await prisma.conversation.delete({ where: { id: req.params.id } })
    res.status(204).send()
  })

  return r
}
