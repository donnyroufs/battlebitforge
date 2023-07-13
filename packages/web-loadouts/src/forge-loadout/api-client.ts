import { ForgeLoadoutDto } from "./schema";

type ForgeLoadoutResult =
  | { type: "success"; id: number, slug: string }
  | { type: "failed"; reason: string };

export class ApiClient {
  public static async forgeLoadoutQuery(
    dto: ForgeLoadoutDto
  ): Promise<ForgeLoadoutResult> {
    try {
      const res = await fetch("/api/forge", {
        method: "POST",
        body: JSON.stringify(dto),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (res.status === 400) {
        return {
          type: "failed",
          reason: "name must be unique",
        };
      }

      return {
        type: "success",
        id: data.id,
        slug: data.slug
      };
    } catch (err) {
      return {
        type: "failed",
        reason: err?.message ?? "unknown",
      };
    }
  }
}
