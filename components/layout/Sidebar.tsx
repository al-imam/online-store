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
    <aside className="md:w-1/3 lg:w-1/4 px-4">
      <ul>
        {currentUser && currentUser.role === "admin" && (
          <Fragment>
            <li>
              <Link
                href="/me/admin/products/new"
                className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
              >
                New Product <span className="text-red-500">(Admin)</span>
              </Link>
            </li>

            <li>
              <Link
                href="/me/admin/products"
                className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
              >
                All Products <span className="text-red-500">(Admin)</span>
              </Link>
            </li>

            <li>
              <Link
                href="/me/admin/customer-orders"
                className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
              >
                Customer Orders <span className="text-red-500">(Admin)</span>
              </Link>
            </li>

            <hr />
          </Fragment>
        )}

        <li>
          <Link
            href="/me"
            className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
          >
            Your Profile
          </Link>
        </li>
        <li>
          <Link
            href="/me/orders"
            className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
          >
            Orders
          </Link>
        </li>
        <li>
          <Link
            href="/me/update-profile"
            className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
          >
            Update Profile
          </Link>
        </li>

        <li>
          <Link
            href="/me/update-password"
            className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
          >
            Update Password
          </Link>
        </li>

        <li>
          <a
            className="block px-3 py-2 text-red-800 hover:bg-red-100 hover:text-white-500 rounded-md cursor-pointer"
            onClick={() => singout(() => router.push("/?page=1"))}
          >
            Logout
          </a>
        </li>
      </ul>
    </aside>
  );
}

export function Sidebar() {
  return (
    <ul className="space-y-1">
      <SidebarItem
        icon={<BoxAddIcon className="h-5 w-5 opacity-75" strokeWidth={1.5} />}
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
      <SidebarItem
        icon={<LogoutIcon className="h-5 w-5 opacity-75" strokeWidth={1.5} />}
        text="Logout"
        action={() => {}}
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
    <ButtonOrA action={action}>
      {icon}

      <span className="text-sm font-medium"> {text} </span>
    </ButtonOrA>
  );
}

function ButtonOrA({
  className = "flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 w-full",
  action,
  children,
}: {
  className?: string;
  action: string | (() => void);
  children: React.ReactNode;
}) {
  return typeof action === "string" ? (
    <li>
      <Link href={action} className={className}>
        {children}
      </Link>
    </li>
  ) : (
    <li>
      <button onClick={action} className={className}>
        {children}
      </button>
    </li>
  );
}
