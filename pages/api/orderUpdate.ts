import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../utils/prisma";

export default async function handleOrdersStatusComplete(req: NextApiRequest, res: NextApiResponse) {
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