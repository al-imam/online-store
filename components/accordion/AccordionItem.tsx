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
      "focus-within:shadow-mauve12 mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10 focus-within:shadow-[0_0_0_2px]",
      className
    )}
    {...props}
    ref={forwardedRef}
  >
    {children}
  </Accordion.Item>
));
