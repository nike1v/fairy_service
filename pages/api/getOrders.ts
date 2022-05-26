import type { NextApiRequest, NextApiResponse  } from "next";
import { getToken } from "next-auth/jwt";

import { prisma } from "../../utils/prisma";

import { OrdersType,  } from "../../types/types";

const getOrders = async (req: NextApiRequest, res: NextApiResponse) => {
  const secret = process.env.NEXT_JWT_SECRET;
  const session = await getToken({ req, secret });
  if (session) {  
    const orders = session.user.admin ? await prisma.orders.findMany({
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
      },
      orderBy: {
        date: "desc"
      }
    }) : await prisma.orders.findMany({
      where: {
        clientId: session.user.id
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
        client: true,
      },
      orderBy: {
        date: "desc"
      }
    });
  
    const ordersFiltered = orders.map((order: OrdersType) => {
      const dateConvert = new Date(order.date);
      return ({
        orderId: order.orderId,
        date: dateConvert.toLocaleDateString(),
        time: dateConvert.toLocaleTimeString(),
        dateTime: dateConvert.toLocaleString(),
        service: order.service.title,
        staff: order.staff.firstName,
        status: order.status,
        client: {
          name: order.client.lastName + " " + order.client.firstName,
          ...order.client,
        }
      });
    });
    const props = {
      orders: ordersFiltered
    };
    res.status(200).json(props);
    res.end();
    return props;
  } else {
    res.status(401).end();
    return {
      orders: []
    };
  }
};

export default getOrders;