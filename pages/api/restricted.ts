import { IncomingMessage } from "http";
import { getSession } from "next-auth/react";

const restricted = async (req: IncomingMessage, res: any) => {
  const session = await getSession({ req });
  if (session) {
    res.send({
      content:
        "This is protected content. You can access this content because you are signed in.",
    });
  } else {
    res.send({
      error: "You must be sign in to view the protected content on this page.",
    });
  }
};

export default restricted;