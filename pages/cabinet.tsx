import type { NextApiRequest, NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import { signOut, useSession } from "next-auth/react";
import Context from "../components";
import styles from "../styles/Cabinet.module.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { db } from "../utils/prisma";
import { getToken, JWT } from "next-auth/jwt";
import { OrderClientType, OrdersType, UserClientType } from "../types/types";

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
  const token: null | JWT = await getToken({
    req,
    secret: process.env.NEXT_JWT_SECRET,
  });
  const user = await db.clients.findFirst({
    where: {
      email: token?.email as string | undefined,
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

  const orders = await db.orders.findMany({
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
      }
    }
  });

  const ordersFiltered = orders.map((order: OrdersType) => {
    const dateConvert = new Date(order.date);
    return ({
      orderId: order.orderId,
      date: dateConvert.toLocaleDateString(),
      time: dateConvert.toLocaleTimeString(),
      service: order.service.title,
      staff: order.staff.firstName,
      status: order.status
    });
  });

  return {
    props: { 
      user: user,
      orders: ordersFiltered
    },
  };
}

interface Props {
  user: UserClientType,
  orders: OrderClientType
}

const Home: NextPage<Props> = ({ user, orders }) => {
  const { t, lang } = useTranslation("user");
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  const signOutButton = () => {
    signOut();
  }; 

  return (
    <Context>
      <main className={styles.container}>
        <button onClick={signOutButton}>Sign out</button>
      </main>
    </Context>
  );
};

export default Home;
