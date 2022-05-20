import type { NextApiRequest, NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import { signOut, useSession } from "next-auth/react";
import Context from "../components";
import styles from "../styles/Cabinet.module.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
import { getToken, JWT } from "next-auth/jwt";
import { OrderClientType, OrdersType, UserClientType } from "../types/types";
import Image from "next/image";
import Link from "next/link";
import OrdersTable from "../components/OrdersTable";

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
  const prisma = new PrismaClient();
  const token: null | JWT = await getToken({
    req,
    secret: process.env.NEXT_JWT_SECRET,
  });
  const user = await prisma.clients.findFirst({
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

  const orders = user?.admin ? await prisma.orders.findMany({
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
      },
      client: {
        select: {
          firstName: true,
          lastName: true,
          phone: true
        }
      }
    },
    orderBy: {
      date: "desc"
    }
  }) : await prisma.orders.findMany({
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
      },
      client: {
        select: {
          firstName: true,
          lastName: true,
          phone: true
        }
      }
    },
    orderBy: {
      date: "desc"
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
      status: order.status,
      client: {
        name: order.client.lastName + " " + order.client.firstName,
        phone: order.client.phone
      }
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
  orders: OrderClientType[]
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
    signOut({ redirect: false });
    router.push("/");
  }; 

  return (
    <Context>
      <main className={styles.container}>
        <div className={styles.greetings}>
          {t("greetings")} {user.firstName}!
        </div>
        <div className={styles.infoBlock}>
          <div className={styles.personalInfo}>
            <div className={styles.userPhone}>
              <Image src={"/images/phone.png"} alt="phone_icon" width={30} height={30} />
              <div className={styles.texts}><a href={`tel:${user.phone}`}>{user.phone}</a></div>
            </div>
            <div className={styles.userEmail}>
              <Image src={"/images/mail.png"} alt="email_icon" width={30} height={30} />
              <div className={styles.texts}><a href={`mailto:${user.email}`}>{user.email}</a></div>
            </div>
            <div className={styles.userEdit}>
              <Link href={"/cabinet/edit"}>{t("editButton")}</Link>
            </div>
            <div className={styles.signOut}>
              <button onClick={signOutButton}>{t("signOutButton")}</button>
            </div>
          </div>
          <div className={styles.orders}>
            <span>
              {t("yourOrders")}
            </span>
            <OrdersTable orders={orders} user={user} />
          </div>    
        </div>
      </main>
    </Context>
  );
};

export default Home;
