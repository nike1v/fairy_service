import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
const prisma = new PrismaClient();


const register = async (req: any, res: any) => {
  if (req.method === "POST")
  {
    const { firstName, lastName, email, password, phone } = req.body;

    try
    {
      const hash = await bcrypt.hash(password, 0);
      await prisma.clients.create({
        data: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone,
          password: hash
        }
      });

      return res.status(200).end();
    }
    catch (err: any)
    {
      return res.status(503).json({err: err.toString()});
    }
  }
  else
  {
    return res.status(405).json({error: "This request only supports POST requests"});
  }
};

export default register;