import type { NextApiRequest, NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import { getSession, signOut, useSession } from "next-auth/react";
import Context from "../components";
import styles from "../styles/Cabinet.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
import { OrderClientType, OrdersType, UserClientType } from "../types/types";
import Image from "next/image";
import Link from "next/link";
import OrdersTable from "../components/OrdersTable";

export async function getStaticProps() {
  const prisma = new PrismaClient();
  const token = await getSession();
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
      dateTime: dateConvert.toLocaleString(),
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
};

const messages = {
  success: "Ви успішно зареєструвались!",
  saved: "Ваші дані успішно оновлено!",
  default: "Ви успішно зареєструвались."
};

const ConfirmRegister = ({ message }: { message: string | string[]}) => {
  const successMessage = message && (messages.success ?? messages.default);
  return <div className={styles.successMessage}>{successMessage}</div>;
};

interface Props {
  user: UserClientType,
  orders: OrderClientType[]
}

const Home: NextPage<Props> = ({ user, orders }) => {
  const { t, lang } = useTranslation("user");
  const [ordersList, setOrdersList] = useState(orders);
  const [ordersListFiltered, setOrdersListFiltered] = useState(orders);
  const router = useRouter();
  const { data: session, status } = useSession();
  const userNames = Array.from(new Set(orders.map((order: OrderClientType) => order.client.name)));
  const services = Array.from(new Set(orders.map((order: OrderClientType) => order.service)));
  const staffNames = Array.from(new Set(orders.map((order: OrderClientType) => order.staff)));

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?error=unauth");
    }
  }, [status, router]);

  const signOutButton = () => {
    signOut({ redirect: false });
    router.push("/");
  };
  
  const handleOrdersFilter = async (date: string, client: string, service: string, staff: string) => {
    let filtered = ordersList;
    if (date){
      filtered = ordersList.filter((order: OrderClientType) => new Date(date).toDateString() === new Date(order.date).toDateString());
    }
    if (client) {
      filtered = ordersList.filter((order: OrderClientType) => client === order.client.name);
    }
    if (service) {
      filtered = ordersList.filter((order: OrderClientType) => service === order.service);
    }
    if(staff) {
      filtered = ordersList.filter((order: OrderClientType) => staff === order.staff);
    }
    setOrdersListFiltered(filtered);
  };

  return (
    <Context>
      <main className={styles.container}>
        {router.query.success && <ConfirmRegister message={router.query.success} />}
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
            {!user.admin &&
            <span>
              {t("yourOrders")}
            </span>}
            {orders && <OrdersTable orders={ordersListFiltered} user={user} orderUpdate={handleOrdersFilter} userNames={userNames} services={services} staffNames={staffNames} />}
          </div>    
        </div>
      </main>
    </Context>
  );
};

export default Home;
