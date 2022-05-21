import React, { useState } from "react";
import type { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Done, Edit } from "@mui/icons-material";
import axios from "axios";
import { useRouter } from "next/router";

import { OrderClientType, UserClientType } from "../types/types";

import styles from "../styles/OrdersTable.module.css";

interface Props {
  user: UserClientType,
  order: OrderClientType
}

const staffList = [
  {
    id: 1,
    name: "Олена",
    job: "Масаж"
  },
  {
    id: 2,
    name: "Катерина",
    job: "Волосся"
  },
  {
    id: 3,
    name: "Марія",
    job: "Манікюр"
  },
  {
    id: 4,
    name: "Анна",
    job: "Волосся"
  },
  {
    id: 5,
    name: "Саша",
    job: "Косметологія"
  },
  {
    id: 6,
    name: "Віолетта",
    job: "Манікюр"
  }
];

const updateOrder = async (orderId: number, options: string) => {
  await axios.post("/api/orderUpdate", {
    orderId,
    options
  });
};

const editOrderData = async (data: { orderId: number, dateTime?: Date, staff?: number }) => {
  return await axios.put("/api/orderDataUpdate", data);
};

const Order: NextPage<Props> = ({ user, order }) => {
  const { t } = useTranslation("user");
  const [isEdit, setIsEdit] = useState(false);
  const [date, setDate] = useState(new Date(order.dateTime).toISOString().substring(0,10));
  const [time, setTime] = useState(new Date(order.dateTime).toISOString().substring(11,16));
  const [staff, setStaff] = useState(order.staff);
  const router = useRouter();
	
  const orderStatus = order.status === "work" ? t("statusWork") : order.status === "abort" ? t("statusAbort") : t("statusCompleted");

  const handleEditButton = () => {
    setIsEdit(true);
  };

  const handleCancelOrderDetails = () => {
    setIsEdit(false);
    setDate(new Date(order.dateTime).toISOString().substring(0,10));
    setTime(new Date(order.dateTime).toISOString().substring(11,16));
    setStaff(order.staff);
  };

  const handleUpdateOrder = async (orderId: number, options: string) => {
    await updateOrder(orderId, options);
    router.push("/cabinet");	
  };

  const saveOrderDetails = async (orderId: number, date?: string, time?: string, staff?: string) => {
    const dateTime = new Date(`${date}, ${time}`);
    const staffId = staffList.filter((staffDetail: { id: number, name: string }) => staffDetail.name === staff)[0].id;
    await editOrderData({ orderId, dateTime, staff: staffId });
    await router.push("/cabinet");
    setIsEdit(false);
  };

  const handleDateChange = (event: any) => {
    setDate(event.target.value);
  };

  const handleTimeChange = (event: any) => {
    setTime(event.target.value);
  };

  const handleStaffChange = (event: any) => {
    setStaff(event.target.value);
  };

  return (
    <tr key={order.orderId} className={`${order.status === "abort" ? styles.aborted : order.status === "completed" ? styles.completed : ""}`}>
      <td className={`${styles.td}`}>
        {
          isEdit ? (
            <input className={styles.input} type={"date"} value={date} onChange={handleDateChange} />
          ) : (
            order.date
          )
        }
      </td>
      <td className={`${styles.td}`}>
        {
          isEdit ? (
            <input className={styles.input}  type={"time"} value={time} onChange={handleTimeChange} />
          ) : (
            order.time
          )
        }
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
        {
          isEdit ? (
            // <input className={styles.input}  type={"text"} value={staff} onChange={handleStaffChange} />
            <select name="staff" value={staff} onChange={handleStaffChange}>
              {
                staffList.filter(({ job }: { job: string }) => job === order.service).map(({ id, name }: { id: number, name: string }) => (
                  <option value={name} key={id}>
                    {name}
                  </option>
                ))
              }
            </select>
          ) : (
            order.staff
          )
        }
      </td>
      <td className={`${styles.td}`}>
        {orderStatus}
      </td>
      <td className={`${styles.td}`}>
        {
          user.admin ? (
            <>
              <button title={t("acceptOrderButton")} onClick={() => isEdit ? saveOrderDetails(order.orderId, date, time, staff) : handleUpdateOrder(order.orderId, "completed")} className={`${order.status === "abort" && styles.abortButton || order.status === "completed" && styles.abortButton}`} disabled={order.status === "abort" || order.status === "completed"}>
                <Done />
              </button>
              {
                isEdit ? null :
                  <button title={t("editOrderButton")} onClick={handleEditButton} className={`${order.status === "abort" && styles.abortButton || order.status === "completed" && styles.abortButton}`} disabled={order.status === "abort" || order.status === "completed"}>
                    <Edit />
                  </button>
              }
            </>
          ) : (
            null
          )
        }
        <button onClick={() => isEdit ? handleCancelOrderDetails() : handleUpdateOrder(order.orderId, "abort")} className={`${order.status === "abort" && styles.abortButton || order.status === "completed" && styles.abortButton}`} disabled={order.status === "abort" || order.status === "completed"}>
          <HighlightOffIcon />
        </button>
      </td>
    </tr>
  );
};

export default Order;
