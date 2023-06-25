"use client";

import { Avatar } from "$components/utility";
import useAuth from "$context/AuthProvider";
import { useSelector } from "$store/index";
import { CartIcon, LogoutIcon, SettingIcon, ThreeDotIcon } from "$svg/icons";
import * as Dropdown from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { twMerge as tw } from "tailwind-merge";

export default function () {
  const [isOpen, setIsOpen] = useState(false);
  const count = useSelector((state) => state.items.length);
  const { singout, currentUser } = useAuth();
  const router = useRouter();

  return (
    <Dropdown.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dropdown.Trigger asChild>
        {currentUser ? (
          <button
            className={`h-10 w-10 hover:ring-4 cursor-pointer relative ring-blue-400/20 rounded-full bg-cover bg-center focus:outline-none focus-visible:ring-4 ${
              isOpen && "ring-4"
            }`}
          >
            <Avatar w={2.5} />{" "}
          </button>
        ) : (
          <button className="focus:outline-none flex items-center justify-center text-gray-700 text-xl hover:text-gray-900 focus-visible:text-gray-900 w-10 h-full rounded">
            <ThreeDotIcon />
          </button>
        )}
      </Dropdown.Trigger>
      <Dropdown.Portal>
        <Dropdown.Content asChild>
          <ul className="z-50 w-48 p-2 overflow-hidden backdrop-blur-sm bg-white/80 text-gray-700 rounded-md shadow absolute top-2 -right-6">
            {currentUser && (
              <Item
                close={() => setIsOpen(false)}
                action="/me"
                text="Setting"
                icon={
                  <SettingIcon className="h-6 w-6 text-gray-950 group-data-[highlighted]/highlighted:text-white" />
                }
              />
            )}

            <Item
              text={`Cart (${count})`}
              className="block md:hidden"
              action="/cart"
              close={() => setIsOpen(false)}
              icon={
                <CartIcon className="h-6 w-6 text-gray-950/90 group-data-[highlighted]/highlighted:text-white" />
              }
            />

            {currentUser ? (
              <Item
                close={() => setIsOpen(false)}
                action={() => singout(() => router.push("/"))}
                text="Logout"
                icon={
                  <LogoutIcon className="h-6 w-6 text-gray-950 group-data-[highlighted]/highlighted:text-white" />
                }
              />
            ) : (
              <Item
                close={() => setIsOpen(false)}
                action="/singin"
                text="Singin"
                icon={
                  <LogoutIcon className="h-6 w-6 text-gray-950 group-data-[highlighted]/highlighted:text-white" />
                }
              />
            )}
          </ul>
        </Dropdown.Content>
      </Dropdown.Portal>
    </Dropdown.Root>
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
    <Dropdown.Item asChild>
      <li
        onClick={close}
        className={tw(
          "group/highlighted leading-none rounded-sm select-none outline-none data-[disabled]:text-gray-400 data-[disabled]:pointer-events-none data-[highlighted]:bg-blue-400 data-[highlighted]:text-white",
          className
        )}
      >
        <ButtonOrA
          action={action}
          className="px-2 py-3 w-full text-sm font-medium flex items-center gap-2"
        >
          {icon}
          <span> {text} </span>
        </ButtonOrA>
      </li>
    </Dropdown.Item>
  );
}

function ButtonOrA({
  className,
  action,
  children,
}: {
  className?: string;
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
