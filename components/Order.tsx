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

const updateOrder = async (orderId: number, options: string) => await axios.post("/api/orderUpdate", {
  orderId,
  options
});

const editOrderData = async (data: { orderId: number, dateTime?: Date, staff?: number }) => await axios.put("/api/orderDataUpdate", data);

const Order: NextPage<Props> = ({ user, order }) => {
  const { t } = useTranslation("user");
  const [isEdit, setIsEdit] = useState(false);
  const [orderData, setOrderData] = useState(order);
  const [date, setDate] = useState(new Date(orderData.dateTime).toISOString().substring(0,10));
  const [time, setTime] = useState(new Date(orderData.dateTime).toISOString().substring(11,16));
  const [staff, setStaff] = useState(orderData.staff);
  const [orderStatus, setOrderStatus] = useState(orderData.status);
  const [orderStatusText, setOrderStatusText] = useState(orderData.status === "work" ? `${t("statusWork")}` : orderData.status === "abort" ? `${t("statusAbort")}` : `${t("statusCompleted")}`);

  const handleEditButton = () => {
    setIsEdit(true);
  };

  const handleCancelOrderDetails = () => {
    setIsEdit(false);
    setDate(new Date(orderData.dateTime).toISOString().substring(0,10));
    setTime(new Date(orderData.dateTime).toISOString().substring(11,16));
    setStaff(orderData.staff);
  };

  const handleUpdateOrder = async (orderId: number, options: string) => {
    const result = await updateOrder(orderId, options);
    setOrderStatus(result.data.status);
    setOrderStatusText(result.data.status === "work" ? `${t("statusWork")}` : result.data.status === "abort" ? `${t("statusAbort")}` : `${t("statusCompleted")}`);
  };

  const saveOrderDetails = async (orderId: number, date?: string, time?: string, staff?: string) => {
    const dateTime = new Date(`${date}, ${time}`);
    const staffId = staffList.filter((staffDetail: { id: number, name: string }) => staffDetail.name === staff)[0].id;
    const result = await editOrderData({ orderId, dateTime, staff: staffId });
    setOrderData(result.data);
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
    <tr key={orderData.orderId} className={`${orderStatus === "abort" ? styles.aborted : orderStatus === "completed" ? styles.completed : ""}`}>
      <td className={`${styles.td}`}>
        {
          isEdit ? (
            <input className={styles.input} type={"date"} value={date} onChange={handleDateChange} />
          ) : (
            orderData.date
          )
        }
      </td>
      <td className={`${styles.td}`}>
        {
          isEdit ? (
            <input className={styles.input}  type={"time"} value={time} onChange={handleTimeChange} />
          ) : (
            orderData.time
          )
        }
      </td>
      {
        user.admin ? (
          <>
            <td className={`${styles.td}`}>
              {orderData.client.name}
            </td>
            <td className={`${styles.td}`}>
              {orderData.client.phone}
            </td>
          </>
        ) : (
          null
        )
      }
      <td className={`${styles.td}`}>
        {orderData.service}
      </td>
      <td className={`${styles.td}`}>
        {
          isEdit ? (
            <select name="staff" value={staff} onChange={handleStaffChange}>
              {
                staffList.filter(({ job }: { job: string }) => job === orderData.service).map(({ id, name }: { id: number, name: string }) => (
                  <option value={name} key={id}>
                    {name}
                  </option>
                ))
              }
            </select>
          ) : (
            orderData.staff
          )
        }
      </td>
      <td className={`${styles.td}`}>
        {orderStatusText}
      </td>
      <td className={`${styles.td}`}>
        {
          user.admin ? (
            <>
              {
                isEdit ?
                  <button title={t("acceptOrderButton")} onClick={() => saveOrderDetails(orderData.orderId, date, time, staff)} className={`${orderStatus === "abort" && styles.abortButton || orderStatus === "completed" && styles.abortButton}`} disabled={orderStatus === "abort" || orderStatus === "completed"}>
                    <Done />
                  </button> :
                  <button title={t("acceptOrderButton")} onClick={() => handleUpdateOrder(orderData.orderId, "completed")} className={`${orderStatus === "abort" && styles.abortButton || orderStatus === "completed" && styles.abortButton}`} disabled={orderStatus === "abort" || orderStatus === "completed"}>
                    <Done />
                  </button>
              }
              {
                isEdit ? null :
                  <button title={t("editOrderButton")} onClick={handleEditButton} className={`${orderStatus === "abort" && styles.abortButton || orderStatus === "completed" && styles.abortButton}`} disabled={orderStatus === "abort" || orderStatus === "completed"}>
                    <Edit />
                  </button>
              }
            </>
          ) : (
            null
          )
        }
        {
          isEdit ?
            <button onClick={handleCancelOrderDetails} className={`${orderStatus === "abort" && styles.abortButton || orderStatus === "completed" && styles.abortButton}`} disabled={orderStatus === "abort" || orderStatus === "completed"}>
              <HighlightOffIcon />
            </button> :
            <button onClick={() => handleUpdateOrder(orderData.orderId, "abort")} className={`${orderStatus === "abort" && styles.abortButton || orderStatus === "completed" && styles.abortButton}`} disabled={orderStatus === "abort" || orderStatus === "completed"}>
              <HighlightOffIcon />
            </button>
        }
      </td>
    </tr>
  );
};

export default Order;
