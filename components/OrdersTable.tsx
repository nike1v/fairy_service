import { useState } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Done, Edit } from "@mui/icons-material";

import handleOrdersStatusEdit from "../pages/api/orderUpdate";

import { OrderClientType, UserClientType } from "../types/types";

import styles from "../styles/OrdersTable.module.css";
import axios from "axios";
import { useRouter } from "next/router";

interface Props {
  user: UserClientType,
  orders: OrderClientType[]
}

const updateOrder = async (orderId: number, options: string) => {
  await axios.post("/api/orderUpdate", {
    orderId,
    options
  });
};

const OrdersTable: NextPage<Props> = ({ user, orders }) => {
  const { t } = useTranslation("user");
  const [isEdit, setIsEdit] = useState(false);
  const router = useRouter();

  const handleUpdateOrder = async (orderId: number, options: string) => {
    await updateOrder(orderId, options);
    router.push("/cabinet");	
  };

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
          orders.map((order: OrderClientType) => {
            const orderStatus = order.status === "work" ? t("statusWork") : order.status === "abort" ? t("statusAbort") : t("statusCompleted");
            return (
              <tr key={order.orderId} className={`${order.status === "abort" ? styles.aborted : order.status === "completed" ? styles.completed : ""}`}>
                <td className={`${styles.td}`}>
                  {order.date}
                </td>
                <td className={`${styles.td}`}>
                  {order.time}
                </td>
                {
                  user.admin ? (
                    <>
                      <td className={`${styles.td}`}>
                        {order.client.name}
                      </td>
                      <td className={`${styles.td}`}>
                        {order.client.phone}
                      </td>
                    </>
                  ) : (
                    null
                  )
                }
                <td className={`${styles.td}`}>
                  {order.service}
                </td>
                <td className={`${styles.td}`}>
                  {order.staff}
                </td>
                <td className={`${styles.td}`}>
                  {orderStatus}
                </td>
                <td className={`${styles.td}`}>
                  {
                    user.admin ? (
                      <>
                        <button title={t("acceptOrderButton")} onClick={() => handleUpdateOrder(order.orderId, "completed")} className={`${order.status === "abort" && styles.abortButton || order.status === "completed" && styles.abortButton}`} disabled={order.status === "abort" || order.status === "completed"}>
                          <Done />
                        </button>
                        <button title={t("editOrderButton")} className={`${order.status === "abort" && styles.abortButton || order.status === "completed" && styles.abortButton}`} disabled={order.status === "abort" || order.status === "completed"}>
                          <Edit />
                        </button>
                      </>
                    ) : (
                      null
                    )
                  }
                  <button onClick={() => handleUpdateOrder(order.orderId, "abort")} className={`${order.status === "abort" && styles.abortButton || order.status === "completed" && styles.abortButton}`}>
                    <HighlightOffIcon />
                  </button>
                </td>
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
};

export default OrdersTable;
