CREATE
OR REPLACE VIEW "WeaponsView" AS
SELECT
  w."id" AS id,
  w."name" AS name,
  json_agg(
    json_build_object('slot', s."name", 'attachments', sa.attachments)
  ) AS attachments
FROM
  "Weapons" w
LEFT JOIN (
    SELECT
      ws."weaponsId",
      sa."slotsId",
      json_agg(
        json_build_object('id', ws."id", 'name', a."name")
      ) AS attachments
    FROM
      "WeaponSlotAttachments" ws
LEFT JOIN "SlotAttachments" sa ON ws."slotAttachmentsId" = sa."id"
LEFT JOIN "Attachments" a ON sa."attachmentsId" = a."id"
    GROUP BY
      ws."weaponsId",
      sa."slotsId"
  ) sa ON w."id" = sa."weaponsId"
LEFT JOIN "Slots" s ON sa."slotsId" = s."id"
GROUP BY
  w."id",
  w."name";
