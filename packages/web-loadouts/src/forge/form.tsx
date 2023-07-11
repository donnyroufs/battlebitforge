"use client";

import {
  Button,
  Form,
  IOption,
  useZodForm,
  Input,
  Select,
} from "@bbforge/design-system";
import { z } from "zod";

const schema = z.object({
  name: z.string(),
  weapon: z.string(),
});

const weapons: IOption[] = [
  {
    id: "ACR",
    name: "ACR",
    value: "ACR",
  },
  {
    id: "AK-74",
    name: "AK-74",
    value: "AK-74",
  },
  {
    id: "M4A1",
    name: "M4A1",
    value: "M4A1",
  },
];

export function ForgeForm() {
  const form = useZodForm({
    schema,
  });

  // TODO: fix type
  function onSubmit(data: any) {}

  return (
    <Form form={form} onSubmit={(data) => onSubmit(data)}>
      <div className="flex flex-col space-y-4">
        <Input name="name" placeholder="Your loadout name" />
        <Select name="weapon" placeholder="Select a weapon" options={weapons} />
        <div className="w-full pt-4">
          <Button variant="primary" w="full">
            Forge
          </Button>
        </div>
      </div>
    </Form>
  );
}

