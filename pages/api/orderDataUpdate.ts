import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handleOrdersData(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient();
  const { dateTime, staff, orderId }: { dateTime: Date | undefined, staff: number | undefined, orderId: number } = req.body;

  const order = await prisma.orders.findFirst({
    where: {
      orderId: +orderId
    },
    include: {
      staff: {
        select: {
          firstName: true
        }
      }
    }
  });

  const result = await prisma.orders.update({
    where: {
      orderId: +orderId,
    },
    data: {
      date: dateTime !== order?.date ? dateTime : order?.date,
      staffId: staff !== order?.staff.firstName ? staff : order?.staff.firstName,
    }
  });
  res.json(result);
}