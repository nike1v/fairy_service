import { db } from "../../utils/prisma";
import * as bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";


const editUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient();
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
        await db.clients.update({
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

        return res.status(200).end();
      } catch (error) {
        return res.status(503).json({ error });
      }
    } else {
      return res.status(405).end().json({error: "This request only supports PUT requests"});
    }
  } catch {
    console.log("error");
  }
};

export default editUser;