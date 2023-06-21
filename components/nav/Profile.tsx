"use client";

import { Avatar } from "$components/utility";
import { useSelector } from "$store/index";
import * as Model from "@radix-ui/react-popover";
import Link from "next/link";
import { useState } from "react";

export default function () {
  const [isOpen, setIsOpen] = useState(false);
  const count = useSelector((state) => state.items.length);

  return (
    <Model.Root open={isOpen} onOpenChange={setIsOpen}>
      <Model.Trigger className="h-10 w-10 hover:ring-4 cursor-pointer relative ring-blue-400/20 rounded-full bg-cover bg-center focus-visible:outline-none focus-visible:ring-4">
        <Avatar w={2.5} />
      </Model.Trigger>
      <Model.Portal>
        <Model.Content className="drop-down z-50 w-48 overflow-hidden bg-white text-gray-700 rounded-md shadow absolute top-2 -right-6">
          <ul>
            <Item
              close={() => setIsOpen(false)}
              action="/me"
              text="Setting"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              }
            />
            <Item
              close={() => setIsOpen(false)}
              action={() => {}}
              text="Logout"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              }
            />
            <Item
              text={`Cart (${count})`}
              className="block md:hidden"
              action="/cart"
              close={() => setIsOpen(false)}
              icon={<i className="fa fa-shopping-cart" />}
            />
          </ul>
        </Model.Content>
      </Model.Portal>
    </Model.Root>
  );
}

interface ItemProps {
  close: () => void;
  icon: React.ReactNode;
  action: string | (() => void);
  text: string;
  className?: string;
}

function Item({ close, icon, action, text, className }: ItemProps) {
  return (
    <li onClick={close} className={className}>
      <ButtonOrA
        action={action}
        className="px-3 py-3 w-full text-sm font-medium flex items-center space-x-2 hover:bg-blue-100/70 focus-visible:outline-none focus-visible:bg-blue-100/70"
      >
        {icon}
        <span> {text} </span>
      </ButtonOrA>
    </li>
  );
}

function ButtonOrA({
  className,
  action,
  children,
}: {
  className: string;
  action: string | (() => void);
  children: React.ReactNode;
}) {
  return typeof action === "string" ? (
    <Link href={action} className={className}>
      {children}
    </Link>
  ) : (
    <button onClick={action} className={className}>
      {children}
    </button>
  );
}
