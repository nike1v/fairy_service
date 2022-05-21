import React from "react";
import type { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";

import Order from "./Order";

import { OrderClientType, UserClientType } from "../types/types";

import styles from "../styles/OrdersTable.module.css";

interface Props {
  user: UserClientType,
  orders: OrderClientType[]
}

const OrdersTable: NextPage<Props> = ({ user, orders }) => {
  const { t } = useTranslation("user");

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={`${styles.th}`}>
            {t("tableHeadDate")}
          </th>
          <th className={`${styles.th}`}>
            {t("tableHeadTime")}
          </th>
          {
            user.admin ? (
              <>
                <th className={`${styles.th}`}>
                  {t("tableHeadClientName")}
                </th>
                <th className={`${styles.th}`}>
                  {t("tableHeadClientNumber")}
                </th>
              </>
            ) : (
              null
            )
          }
          <th className={`${styles.th}`}>
            {t("tableHeadService")}
          </th>
          <th className={`${styles.th}`}>
            {t("tableHeadMaster")}
          </th>
          <th className={`${styles.th}`}>
            {t("tableHeadStatus")}
          </th>
          <th className={`${styles.th}`}>
            {t("tableHeadActions")}
          </th>
        </tr>
      </thead>
      <tbody>
        {
          orders.map((order: OrderClientType) => <Order user={user} order={order} key={order.orderId} />)
        }
      </tbody>
    </table>
  );
};

export default OrdersTable;
