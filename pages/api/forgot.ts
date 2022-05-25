import { NextApiRequest, NextApiResponse } from "next";

const forgotPassword = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email } = req.body;

    try {
      console.log(email);
      res.status(200);
    } catch (error) {
      res.status(503).json({ error });
    }
  } else {
    res.status(405).json({error: "This request only supports POST requests"});
  }
  return res.end();
};

export default forgotPassword;