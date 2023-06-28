"use client";

import * as AccordionUI from "@radix-ui/react-accordion";
import { AccordionItem } from "./AccordionItem";
import { AccordionContent } from "./AccordionContent";
import { AccordionTrigger } from "./AccordionTrigger";
import { Price, Category, Availability } from "$components/filters";

export function Accordion() {
  return (
    <AccordionUI.Root
      className="space-y-2 [&_.feature]:bg-red-700"
      type="single"
      defaultValue="category"
      collapsible
    >
      <AccordionItem value="availability">
        <AccordionTrigger>Availability</AccordionTrigger>
        <AccordionContent>
          <Availability />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="price">
        <AccordionTrigger>Price</AccordionTrigger>
        <AccordionContent>
          <Price />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="category">
        <AccordionTrigger>Category</AccordionTrigger>
        <AccordionContent>
          <Category />
        </AccordionContent>
      </AccordionItem>
    </AccordionUI.Root>
  );
}
