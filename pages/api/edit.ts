import * as bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../utils/prisma";

const editUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { firstName, lastName, email, password, phone, clientId } = req.body;

  try {
    const user = await prisma.clients.findFirst({
      where: {
        clientId: +clientId
      }
    });
	
    if (req.method === "PUT") {
      const hash = await bcrypt.hash(password, 0);
      try {
        await prisma.clients.update({
          where: {
            clientId: +clientId
          },
          data: {
            firstName: firstName !== user?.firstName ? firstName : user?.firstName,
            lastName: lastName !== user?.lastName ? lastName : user?.lastName,
            email: email !== user?.email ? email : user?.email,
            phone: phone !== user?.phone ? phone : user?.phone,
            password: hash !== user?.password ? hash : user.password
          }
        });

        res.status(200);
      } catch (error) {
        res.status(503).json({ error });
      }
    } else {
      res.status(405).json({error: "This request only supports PUT requests"});
    }
  } catch {
    console.log("error");
  } finally {
    res.end();
  }
};

export default editUser;