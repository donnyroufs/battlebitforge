import { ForgeLoadoutDto } from "./schema";

type ForgeLoadoutResult =
  | { type: "success"; id: number }
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

      return {
        type: "success",
        id: data.id,
      };
    } catch (err) {
      return {
        type: "failed",
        reason: err?.message ?? "unknown",
      };
    }
  }
}
