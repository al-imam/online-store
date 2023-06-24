"use client";

import useAuth from "$context/AuthProvider";
import {
  BoxAddIcon,
  BoxIcon,
  BoxesIcon,
  CustomerOrderIcon,
  LogoutIcon,
  PasswordWriteIcon,
  UserIcon,
  UserWriteIcon,
} from "$svg/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment } from "react";

export default function () {
  const { singout, currentUser } = useAuth();
  const router = useRouter();

  return (
    <ul className="space-y-1">
      <SidebarItem
        icon={<UserIcon className="h-5 w-5 opacity-75" />}
        text="Profile"
        action="/me"
      />
      <SidebarItem
        icon={<BoxIcon className="h-5 w-5 opacity-75" />}
        text="Orders"
        action="/me/orders"
      />
      <SidebarItem
        icon={<UserWriteIcon className="h-5 w-5 opacity-75" />}
        text="Update profile"
        action="/me/update-profile"
      />
      <SidebarItem
        icon={<PasswordWriteIcon className="h-5 w-5 opacity-75" />}
        text="Update password"
        action="/me/update-password"
      />

      {currentUser && currentUser.role === "admin" && (
        <Fragment>
          <SidebarItem
            icon={
              <BoxAddIcon className="h-5 w-5 opacity-75" strokeWidth={1.5} />
            }
            text="Create product"
            action="/me/admin/products/new"
          />
          <SidebarItem
            icon={<BoxesIcon className="h-5 w-5 opacity-75" />}
            text="Products"
            action="/me/admin/products"
          />
          <SidebarItem
            icon={<CustomerOrderIcon className="h-5 w-5 opacity-75" />}
            text="Customer orders"
            action="/me/admin/customer-orders"
          />
        </Fragment>
      )}

      <SidebarItem
        icon={
          <LogoutIcon
            className="h-5 w-5 opacity-75 text-red-500"
            strokeWidth={1.5}
          />
        }
        text="Logout"
        action={() => singout(() => router.push("/?page=1"))}
      />
    </ul>
  );
}

function SidebarItem({
  icon,
  text,
  action = () => [],
}: {
  icon: React.ReactNode;
  text: string;
  action?: string | (() => void);
}) {
  return (
    <ButtonOrLink action={action}>
      {icon}

      <span className="text-sm font-medium"> {text} </span>
    </ButtonOrLink>
  );
}

function ButtonOrLink({
  className = "",
  action,
  children,
}: {
  className?: string;
  action: string | (() => void);
  children: React.ReactNode;
}) {
  const classes = `flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 w-full ${className}`;
  return typeof action === "string" ? (
    <li>
      <Link href={action} className={classes}>
        {children}
      </Link>
    </li>
  ) : (
    <li>
      <button onClick={action} className={classes}>
        {children}
      </button>
    </li>
  );
}
