"use client"; // Ensure this is included

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import SideBarListItem from "./components/sidebar_list_item";
import {
  FaTachometerAlt,
  FaHourglassHalf,
  FaCog,
  FaTruck,
  FaCheckCircle,
  FaBan,
  FaListAlt, // Added icon for all orders
} from "react-icons/fa";

const iconSize = 24;

const SideBar = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const pathName = usePathname();

  useEffect(() => {
    const path = pathName.split("/")[2];
    switch (path) {
      case "":
        setSelectedIndex(0);
        break;
      case "pending":
        setSelectedIndex(1);
        break;
      case "processing":
        setSelectedIndex(2);
        break;
      case "shipped":
        setSelectedIndex(3);
        break;
      case "delivered":
        setSelectedIndex(4);
        break;
      case "cancelled":
        setSelectedIndex(5);
        break;
      default:
        setSelectedIndex(0);
        break;
    }
  }, [pathName]);

  return (
    <aside className="static w-56 mt-10 mx-5">
      <SideBarListItem
        label="All Orders"
        icon={<FaListAlt size={iconSize} />}
        href="/orders"
        isSelected={selectedIndex === 0}
      />
      <SideBarListItem
        label="Pending"
        icon={<FaHourglassHalf size={iconSize} />}
        href="/orders/pending"
        isSelected={selectedIndex === 1}
      />
      <SideBarListItem
        label="Processing"
        icon={<FaCog size={iconSize} />}
        href="/orders/processing"
        isSelected={selectedIndex === 2}
      />
      <SideBarListItem
        label="Shipped"
        icon={<FaTruck size={iconSize} />}
        href="/orders/shipped"
        isSelected={selectedIndex === 3}
      />
      <SideBarListItem
        label="Delivered"
        icon={<FaCheckCircle size={iconSize} />}
        href="/orders/delivered"
        isSelected={selectedIndex === 4}
      />
      <SideBarListItem
        label="Cancelled"
        icon={<FaBan size={iconSize} />}
        href="/orders/cancelled"
        isSelected={selectedIndex === 5}
      />
    </aside>
  );
};

export default SideBar;
