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
        "group/trigger flex flex-1 cursor-default items-center justify-between p-4 text-[15px] leading-none",
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      {children}
      <ArrowLeftIcon
        className="ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 -rotate-90 group-data-[state=open]/trigger:rotate-90"
        aria-hidden
      />
    </Accordion.Trigger>
  </Accordion.Header>
));
