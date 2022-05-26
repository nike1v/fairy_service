import * as bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../utils/prisma";

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { firstName, lastName, email, password, phone } = req.body;

    try {
      const hash = await bcrypt.hash(password, 0);
      const user = await prisma.clients.create({
        data: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone,
          password: hash
        }
      });

      res.status(200).json(user);
    } catch (error) {
      res.status(503).json({ error });
    }
  } else {
    res.status(405).json({error: "This request only supports POST requests"});
  }
  res.end();
};

export default register;