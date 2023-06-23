"use client";

import { Avatar } from "$components/utility";
import { useSelector } from "$store/index";
import { CartIcon, LogoutIcon, SettingIcon } from "$svg/icons";
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
              icon={<SettingIcon className="text-2xl text-gray-950" />}
            />
            <Item
              close={() => setIsOpen(false)}
              action={() => {}}
              text="Logout"
              icon={<LogoutIcon className="text-2xl text-gray-950" />}
            />
            <Item
              text={`Cart (${count})`}
              className="block md:hidden"
              action="/cart"
              close={() => setIsOpen(false)}
              icon={<CartIcon className="text-2xl text-gray-950/90" />}
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
