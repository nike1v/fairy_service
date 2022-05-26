import type { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import { signOut, useSession } from "next-auth/react";
import Context from "../components";
import styles from "../styles/Cabinet.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { OrderClientType, OrdersType, UserClientType } from "../types/types";
import Image from "next/image";
import Link from "next/link";
import OrdersTable from "../components/OrdersTable";

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

const Home: NextPage<Props> = () => {
  const { t } = useTranslation("user");
  const [ordersList, setOrdersList] = useState<OrderClientType[]>([] as OrderClientType[]);
  const { data: session, status } = useSession();
  const [user, setUser] = useState<UserClientType>();
  const [ordersListFiltered, setOrdersListFiltered] = useState<OrderClientType[]>([]);
  const router = useRouter();
  const userNames = Array.from(new Set(ordersList.map((order: OrderClientType) => order.client.name)));
  const services = Array.from(new Set(ordersList.map((order: OrderClientType) => order.service)));
  const staffNames = Array.from(new Set(ordersList.map((order: OrderClientType) => order.staff)));

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?error=unauth");
    }
  }, [status, router]);

  useEffect(() => {
    const getUserObject = async () => {
      const user = await (await fetch("/api/getUser")).json();
      if (status === "authenticated") {
        setUser(user.user);
      }
    };
    getUserObject();
  }, [status]);

  useEffect(() => {
    const getOrdersList = async () => {
      const response = await(await fetch("/api/getOrders")).json();
      const { orders } = response;
      setOrdersList(orders);
      setOrdersListFiltered(orders);
    };
    getOrdersList();
  }, []);

  const signOutButton = () => {
    signOut({ callbackUrl: "/", redirect: false });
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

  return user ? (
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
            <OrdersTable orders={ordersListFiltered} user={user} orderUpdate={handleOrdersFilter} userNames={userNames} services={services} staffNames={staffNames} />
          </div>    
        </div>
      </main>
          
    </Context>
  ) : (
    null
  );
};

export default Home;
