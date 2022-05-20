import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handleOrdersStatusComplete(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient();
  const statusUpdate = req.body.options === "abort" ? "abort" : "completed";

  const result = await prisma.orders.update({
    where: {
      orderId: req.body.orderId
    },
    data: {
      status: statusUpdate
    }
  });
  res.json(result);
}