import type { NextApiRequest, NextApiResponse  } from "next";
import { PrismaClient } from "@prisma/client";
import { OrdersType,  } from "../../types/types";
import { getToken } from "next-auth/jwt";

const getOrders = async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient();
  const secret = process.env.NEXT_JWT_SECRET;
  const session = await getToken({ req, secret });
  if (session) {
    const user = await prisma.clients.findFirst({
      where: {
        email: session.user.email
      },
      select: {
        clientId: true,
        firstName: true,
        phone: true,
        email: true,
        lastName: true,
        admin: true
      }
    });
  
    const orders = user?.admin ? await prisma.orders.findMany({
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
        clientId: user?.clientId
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
          phone: order.client.phone
        }
      });
    });
    const props = {
      user: user,
      orders: ordersFiltered
    };
    res.status(200).json(props);
    res.end();
    return props;
  } else {
    res.status(401).end();
    return {
      user: {},
      orders: []
    };
  }
};

export default getOrders;