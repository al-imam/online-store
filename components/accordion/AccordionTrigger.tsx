"use client";

import { ArrowLeftIcon } from "$svg/arrow";
import * as Accordion from "@radix-ui/react-accordion";
import { forwardRef } from "react";
import { twMerge as tw } from "tailwind-merge";

export const AccordionTrigger = forwardRef<
  HTMLButtonElement,
  Accordion.AccordionTriggerProps
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Header className="flex">
    <Accordion.Trigger
      className={tw(
        "text-violet11 shadow-mauve6 hover:bg-mauve2 group flex h-[45px] flex-1 cursor-default items-center justify-between bg-white px-5 text-[15px] leading-none shadow-[0_1px_0] outline-none",
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      {children}
      <ArrowLeftIcon
        className="text-violet10 ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 -rotate-90 group-data-[state=open]:rotate-90"
        aria-hidden
      />
    </Accordion.Trigger>
  </Accordion.Header>
));
