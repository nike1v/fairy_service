import type { NextApiRequest, NextApiResponse  } from "next";
import { getToken } from "next-auth/jwt";

import { prisma } from "../../utils/prisma";

const getOrders = async (req: NextApiRequest, res: NextApiResponse) => {
  const secret = process.env.NEXT_JWT_SECRET;
  const session = await getToken({ req, secret });
  if (session) {  
    const user = await prisma.clients.findFirst({
      where: {
        email: session.user.email as any
      }
    });
    const props = {
      user
    };
    res.status(200).json(props);
    res.end();
    return props;
  } else {
    res.status(401).end();
    return {
      user: {}
    };
  }
};

export default getOrders;