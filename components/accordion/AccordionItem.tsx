"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { forwardRef } from "react";
import { twMerge as tw } from "tailwind-merge";

export const AccordionItem = forwardRef<
  HTMLDivElement,
  Accordion.AccordionItemProps
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Item
    className={tw(
      "overflow-hidden rounded border border-gray-300 relative focus-within:z-10 ",
      className
    )}
    {...props}
    ref={forwardedRef}
  >
    {children}
  </Accordion.Item>
));
