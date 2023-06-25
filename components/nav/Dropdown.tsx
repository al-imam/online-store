"use client";

import * as Dropdown from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { twMerge as tw } from "tailwind-merge";

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
