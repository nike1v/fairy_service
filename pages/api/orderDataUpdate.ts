import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../utils/prisma";

export default async function handleOrdersData(req: NextApiRequest, res: NextApiResponse) {
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
    },
    include: {
      service: {
        select: {
          title: true
        }
      },
      staff: {
        select: {
          firstName: true,
        }
      },
      client: {
        select: {
          firstName: true,
          lastName: true,
          phone: true
        }
      }
    }
  });

  const dateConvert = new Date(result.date);

  const filteredResult = {
    orderId: result.orderId,
    date: dateConvert.toLocaleDateString(),
    time: dateConvert.toLocaleTimeString(),
    dateTime: dateConvert.toLocaleString(),
    service: result.service.title,
    staff: result.staff.firstName,
    status: result.status,
    client: {
      name: result.client.lastName + " " + result.client.firstName,
      ...result.client,
    }
  };

  res.json(filteredResult);
}