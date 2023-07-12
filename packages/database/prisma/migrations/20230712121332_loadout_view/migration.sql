CREATE
OR REPLACE VIEW "LoadoutsView" AS
SELECT
  L.id AS id,
  L.name AS name,
  W.name AS "weaponName",
  json_agg(
    json_build_object(
      'slotId',
      SA.id,
      'attachmentId',
      LI."weaponSlotAttachmentsId",
      'attachmentName',
      CASE
        WHEN LI."weaponSlotAttachmentsId" IS NOT NULL THEN A.name
        ELSE NULL
      END
    )
    ORDER BY
      SA.id
  ) AS attachments
FROM
  "Loadouts" L
  JOIN "Weapons" W ON L."weaponsId" = W.id
  JOIN "WeaponSlotAttachments" WSA ON WSA."weaponsId" = W.id
  JOIN "SlotAttachments" SA ON SA.id = WSA."slotAttachmentsId"
  LEFT JOIN "LoadoutItems" LI ON LI."weaponSlotAttachmentsId" = WSA.id
  AND LI."loadoutId" = L.id
  LEFT JOIN "Attachments" A ON A.id = SA."attachmentsId"
GROUP BY
  L.id,
  L.name,
  W.name;