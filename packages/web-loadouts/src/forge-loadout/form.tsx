"use client";

import { useState } from "react";
import {
  Button,
  Form,
  IOption,
  useZodForm,
  Input,
  Select,
} from "@bbforge/design-system";
import { Slots } from "@prisma/client";
import { ForgeLoadoutDto, schema } from "./schema";
import { ApiClient } from "./api-client";
import { WeaponsView } from "../view-loadout/infra/get-loadout-by-slug";
import { useRouter } from "next/navigation";

type ForgeFormProps = {
  weapons: WeaponsView[];
  slots: Slots[];
};

export function ForgeForm({ weapons, slots }: ForgeFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const form = useZodForm({
    schema,
  });

  const selectedWeaponId = form.watch("weapon");
  const selectedWeapon =
    selectedWeaponId &&
    weapons.find((weapon) => weapon.id === Number(selectedWeaponId));

  async function onSubmit(data: any) {
    setError(null);
    const dto: ForgeLoadoutDto = {
      name: data.name!,
      selected: data.selected.map((x) =>
        typeof x.id === "string" ? +x.id : null
      ),
      weapon: +data.weapon!,
    };

    const result = await ApiClient.forgeLoadoutQuery(dto);

    switch (result.type) {
      case "failed":
        setError(result.reason);
        break;
      case "success":
        router.push("/loadouts/" + result.slug);
        break;
    }
  }

  const weaponOptions = weapons.map<IOption>((weapon) => ({
    name: weapon.name,
    value: weapon.id,
  }));

  const weaponSlots =
    selectedWeapon?.attachments.map((attachment) => attachment.slot) ?? [];
  const mergedSlots = Array.from(
    new Set([...weaponSlots, ...slots.map((x) => x.name)])
  );

  function getAttachmentsForWeaponSlot(slot: string) {
    if (!selectedWeapon) return [];
    return (
      selectedWeapon.attachments
        .find((attachment) => attachment.slot === slot)
        ?.attachments.map((x) => ({ value: x.id, name: x.name })) ?? []
    );
  }

  return (
    <Form form={form} onSubmit={(data) => onSubmit(data)}>
      <div className="flex flex-col space-y-4">
        <Input
          name="name"
          placeholder="Your loadout name"
          {...form.register("name")}
        />
        <Select
          name="weapon"
          placeholder="Select a weapon"
          options={weaponOptions}
          {...form.register("weapon")}
        />
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl mt-4 mb-2">Select Attachments</h3>
          {mergedSlots.map((slot, index) => (
            <Select
              key={slot}
              name={slot}
              disabled={getAttachmentsForWeaponSlot(slot).length === 0}
              label={slot}
              placeholder={`Select a ${slot}`}
              options={getAttachmentsForWeaponSlot(slot) ?? []}
              {...form.register(`selected.${index}.id`)}
            />
          ))}
        </div>
        <div className="w-full pt-4">
          <Button variant="primary" w="full">
            Forge
          </Button>
          {error && (
            <p className="text-red-400 py-2 font-bold">
              * Failed to create: {error}
            </p>
          )}
        </div>
      </div>
    </Form>
  );
}
