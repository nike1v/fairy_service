import { db } from "../../utils/prisma";
import * as bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";


const register = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { firstName, lastName, email, password, phone } = req.body;

    try {
      const hash = await bcrypt.hash(password, 0);
      await db.clients.create({
        data: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone,
          password: hash
        }
      });

      return res.status(200).end();
    } catch (error) {
      return res.status(503).end().json({ error });
    }
  } else {
    return res.status(405).end().json({error: "This request only supports POST requests"});
  }
};

export default register;