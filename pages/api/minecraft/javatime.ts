// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { RCON } from 'minecraft-server-util';
import { addHours, format } from 'date-fns';
const RCON_PORT = process.env['RCON_PORT'] ?? 25576;

async function getTime() {
  const client = new RCON();
  await client.connect('localhost', RCON_PORT);
  await client.login('minecraft');
  const message = await client.execute('time query daytime');
  const [_, ticksStr] = message.split('The time is ');
  const ticks = parseInt(ticksStr, 10);
  await client.close();
  const seconds = ticks * 3.6;
  const ms = seconds * 1000;
  let date = new Date(ms);
  date = addHours(date, 6);
  return format(date, 'KK:mm:ss a');
}

type TimeResponse = {
  time: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TimeResponse>
) {
  switch (req.method) {
    case 'GET': {
      const date = await getTime();
      res.status(200).json({
        time: date
      })
      return;
    }
    default: {
      res.status(404).end(`Not Found`);
      return;
    }
  }
}
