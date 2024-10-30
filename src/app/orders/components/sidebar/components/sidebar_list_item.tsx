import React from "react";
import Link from "next/link";

interface SideBarListItemProps {
  icon: React.ReactElement;
  label: string;
  href: string;
  isSelected: boolean;
}

const SideBarListItem = ({
  icon,
  label,
  href,
  isSelected,
}: SideBarListItemProps) => {
  return (
    <Link
      href={href}
      className={`flex items-center p-2 hover:bg-sky-500 rounded-lg cursor-pointer my-2 ${
        isSelected ? "bg-sky-700" : ""
      }`}
    >
      <div className="mr-3">
        {React.cloneElement(icon, {
          color: isSelected ? "#ffffff" : null,
        })}
      </div>
      <div className="flex-1">
        {isSelected ? (
          <span className="text-sm font-bold text-white">{label}</span>
        ) : (
          <span className="text-sm font-medium">{label}</span>
        )}
      </div>
    </Link>
  );
};

export default SideBarListItem;
