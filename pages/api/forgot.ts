import { NextApiRequest, NextApiResponse } from "next";

const forgotPassword = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email } = req.body;

    try {
      console.log(email);
      return res.status(200).end();
    } catch (error) {
      return res.status(503).json({ error });
    }
  } else {
    return res.status(405).end().json({error: "This request only supports POST requests"});
  }
};

export default forgotPassword;