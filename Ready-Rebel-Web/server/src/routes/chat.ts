import { Router } from 'express';
import OpenAI from 'openai';

export const chatRouter = Router();

chatRouter.post('/', async (req, res) => {
  try {
    const { message } = req.body as { message?: string };
    if (!message) return res.status(400).json({ error: 'message is required' });

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are Rebel, a friendly assistant.' },
        { role: 'user', content: message }
      ]
    });

    const text = completion.choices?.[0]?.message?.content ?? '';
    res.json({ reply: text });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Chat failed', detail: String(err?.message || err) });
  }
});
