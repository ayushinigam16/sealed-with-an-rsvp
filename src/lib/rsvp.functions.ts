import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { appendRsvpRow } from "./rsvp.server";

export const rsvpSchema = z.object({
  rsvpId: z.string().min(6).max(40),
  name: z.string().trim().min(2).max(100),
  mobile: z.string().trim().regex(/^\+?[0-9\s-]{8,16}$/),
  email: z.string().trim().email().max(150).optional().or(z.literal("")),
  status: z.enum(["Joyfully Accepts", "Regretfully Declines"]),
  guestCount: z.number().int().min(0).max(20),
  guestNames: z.string().max(500),
  events: z.array(z.string().max(50)).max(10),
  dietary: z.string().max(100),
  accommodation: z.boolean(),
  travel: z.boolean(),
  message: z.string().max(1000),
});

const seen = new Set<string>();

export const submitRsvp = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => rsvpSchema.parse(d))
  .handler(async ({ data }) => {
    if (seen.has(data.rsvpId)) return { ok: true, rsvpId: data.rsvpId };
    const ts = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    const accepted = data.status === "Joyfully Accepts";
    await appendRsvpRow([
      ts, data.rsvpId, data.name, data.mobile, data.email ?? "", data.status,
      accepted ? Math.max(1, data.guestCount) : 0, data.guestNames,
      accepted ? data.events.join(", ") : "", data.dietary,
      data.accommodation ? "Yes" : "No", data.travel ? "Yes" : "No",
      data.message, "Website", "Received",
    ]);
    seen.add(data.rsvpId);
    return { ok: true, rsvpId: data.rsvpId };
  });
