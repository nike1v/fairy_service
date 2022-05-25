import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import type { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import ClearIcon from "@mui/icons-material/Clear";
import FilterAlt from "@mui/icons-material/FilterAlt";

import Order from "./Order";

import { OrderClientType, UserClientType } from "../types/types";

import styles from "../styles/OrdersTable.module.css";

interface Props {
  user: UserClientType,
  orders: OrderClientType[];
  orderUpdate: any,
  userNames: string[],
  services: string[],
  staffNames: string[],
}

interface filterProps {
  user: UserClientType;
  children?: React.ReactNode;
  orderUpdate: MouseEventHandler<HTMLButtonElement>
}

const FilterWindow: NextPage<filterProps> = ({ user, children, orderUpdate }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation("user");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      const isDropdownClick = dropdownRef.current && dropdownRef.current.contains(event.target);
 
      if (isDropdownClick) {
        return;
      }
      setIsOpen(false);
    };
 
    document.addEventListener("mousedown", handleClickOutside); // handle desktops
 
    // Event cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // handle desktops
    };
  }, [dropdownRef]);

  return (
    user.admin ? (
      <>
        <button onClick={() => setIsOpen(!isOpen)} className={styles.filterButton}>
          <FilterAlt color="primary" />
        </button>
        {
          isOpen && (
            <div ref={dropdownRef} className={styles.filterDropdown}>
              <div>
                {children}
              </div>
              <div className={styles.filterDropdownActions}>
                <button className={styles.filterDropdownButton} onClick={orderUpdate}>
                  {t("filterButton")}
                </button>
              </div>
            </div>
          )
        }
      </>
    ) : null
  );
};

const OrdersTable: NextPage<Props> = ({ user, orders, orderUpdate, userNames, services, staffNames }) => {
  const { t } = useTranslation("user");
  const [currentDate, setCurrentDate] = useState("");
  const [currentClient, setCurrentClient] = useState("");
  const [currentService, setCurrentService] = useState("");
  const [currentStaff, setCurrentStaff] = useState("");

  const handleDate = (event: any) => {
    setCurrentDate(event?.target.value);
  };

  const handleClient = (event: any) => {
    setCurrentClient(event?.target.value);
  };

  const handleService = (event: any) => {
    setCurrentService(event?.target.value);
  };

  const handleStaff = (event: any) => {
    setCurrentStaff(event?.target.value);
  };

  const handleValues = () => {
    orderUpdate(currentDate, currentClient, currentService, currentStaff);
  };

  const handleClearFilters = () => {
    setCurrentClient("");
    setCurrentDate("");
    setCurrentService("");
    setCurrentStaff("");
    orderUpdate("", "", "", "");
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={`${styles.th} ${styles.filter}`}>
            {t("tableHeadDate")}
            <FilterWindow user={user} orderUpdate={handleValues}>
              <input type={"date"} value={currentDate} onChange={handleDate} />
            </FilterWindow>
          </th>
          <th className={`${styles.th}`}>
            {t("tableHeadTime")}
          </th>
          {
            user.admin ? (
              <>
                <th className={`${styles.th} ${styles.filter}`}>
                  {t("tableHeadClientName")}
                  <FilterWindow user={user} orderUpdate={handleValues}>
                    <select value={currentClient} onChange={handleClient}>
                      {
                        userNames.map((name: string) => (
                          <option key={name} value={name}>{name}</option>
                        ))
                      }
                      <option value={""}>Усі</option>
                    </select>
                  </FilterWindow>
                </th>
                <th className={`${styles.th}`}>
                  {t("tableHeadClientNumber")}
                </th>
              </>
            ) : (
              null
            )
          }
          <th className={`${styles.th} ${styles.filter}`}>
            {t("tableHeadService")}
            <FilterWindow user={user} orderUpdate={handleValues}>
              <select value={currentService} onChange={handleService}>
                {
                  services.map((name: string) => (
                    <option key={name} value={name}>{name}</option>
                  ))
                }
                <option value={""}>Усі</option>
              </select>
            </FilterWindow>
          </th>
          <th className={`${styles.th} ${styles.filter}`}>
            {t("tableHeadMaster")}
            <FilterWindow user={user} orderUpdate={handleValues}>
              <select value={currentStaff} onChange={handleStaff}>
                {
                  staffNames.map((name: string) => (
                    <option key={name} value={name}>{name}</option>
                  ))
                }
                <option value={""}>Усі</option>
              </select>
            </FilterWindow>
          </th>
          <th className={`${styles.th}`}>
            {t("tableHeadStatus")}
          </th>
          <th className={`${styles.th}`}>
            {t("tableHeadActions")}
            {
              user.admin && 
            <button onClick={handleClearFilters} title={t("clearFilterButton")}>
              <ClearIcon color="primary" />
            </button>
            }
          </th> 
        </tr>
      </thead>
      <tbody>
        {
          orders.length > 0 && orders.map((order: OrderClientType) => <Order user={user} order={order} key={order.orderId} />)
        }
      </tbody>
    </table>
  );
};

export default OrdersTable;
