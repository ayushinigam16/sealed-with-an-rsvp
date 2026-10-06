import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Loader2 } from "lucide-react";
import { submitRsvp } from "@/lib/rsvp.functions";
import { wedding } from "@/config/wedding";

type Status = "Joyfully Accepts" | "Regretfully Declines";
const newId = () => `RSVP-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

const field = "w-full border-0 border-b border-border bg-transparent px-0 py-2.5 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-gold focus:outline-none focus:ring-0";
const label = "eyebrow block mb-1";

export function Rsvp() {
  const submit = useServerFn(submitRsvp);
  const [rsvpId] = useState(newId);
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [errors, setErrors] = useState<{ name?: string; mobile?: string; email?: string; status?: string }>({});
  const [status, setStatus] = useState<Status | "">("");
  const [events, setEvents] = useState<string[]>([]);
  const [sentName, setSentName] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "loading" || state === "done") return;
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "").trim();
    const mobile = String(f.get("mobile") || "").trim();
    const email = String(f.get("email") || "").trim();
    const errs: { name?: string; mobile?: string; email?: string; status?: string } = {};
    if (name.length < 2) errs.name = "Please share your full name";
    if (!/^\+?[0-9\s-]{8,16}$/.test(mobile)) errs.mobile = "Please enter a valid mobile number";
    if (email && !/^\S+@\S+\.\S+$/.test(email)) errs.email = "Please check your email";
    if (!status) errs.status = "Please let us know if you can join";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setState("loading");
    try {
      await submit({
        data: {
          rsvpId, name, mobile, email, status: status as Status,
          guestCount: Number(f.get("guests") || 1),
          guestNames: String(f.get("guestNames") || ""),
          events, dietary: String(f.get("dietary") || ""),
          accommodation: f.get("accommodation") === "on",
          travel: f.get("travel") === "on",
          message: String(f.get("message") || ""),
        },
      });
      setSentName(name.split(" ")[0]);
      setState("done");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="animate-scale-in mx-auto max-w-lg border border-gold/50 bg-card p-10 text-center shadow-card" role="status">
        <p className="eyebrow">Thank you</p>
        <h3 className="mt-4 text-4xl text-wine">Dear {sentName},</h3>
        <p className="mt-4 font-serif text-xl italic text-muted-foreground">
          {status === "Joyfully Accepts"
            ? "Your presence will make our celebration complete. We can't wait to see you."
            : "You will be missed dearly. Thank you for your love and blessings."}
        </p>
        <p className="mt-6 text-xs tracking-widest text-muted-foreground">REFERENCE · {rsvpId}</p>
      </div>
    );
  }

  const accepting = status === "Joyfully Accepts";
  return (
    <form onSubmit={onSubmit} noValidate className="mx-auto max-w-xl space-y-7 border border-gold/40 bg-card/80 p-6 shadow-card sm:p-10">
      <div>
        <label htmlFor="name" className={label}>Full name *</label>
        <input id="name" name="name" autoComplete="name" className={field} aria-invalid={!!errors.name} />
        {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name}</p>}
      </div>
      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor="mobile" className={label}>Mobile *</label>
          <input id="mobile" name="mobile" type="tel" inputMode="tel" autoComplete="tel" className={field} aria-invalid={!!errors.mobile} />
          {errors.mobile && <p className="mt-1 text-sm text-destructive">{errors.mobile}</p>}
        </div>
        <div>
          <label htmlFor="email" className={label}>Email</label>
          <input id="email" name="email" type="email" autoComplete="email" className={field} />
          {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email}</p>}
        </div>
      </div>
      <fieldset>
        <legend className={label}>Will you attend? *</legend>
        <div className="mt-2 grid grid-cols-2 gap-3">
          {(["Joyfully Accepts", "Regretfully Declines"] as Status[]).map((s) => (
            <button type="button" key={s} onClick={() => setStatus(s)} aria-pressed={status === s}
              className={`min-h-12 border px-3 py-3 font-serif text-lg transition-colors ${status === s ? "border-wine bg-wine text-primary-foreground" : "border-border hover:border-gold"}`}>
              {s}
            </button>
          ))}
        </div>
        {errors.status && <p className="mt-1 text-sm text-destructive">{errors.status}</p>}
      </fieldset>

      {accepting && (
        <div className="animate-fade-in space-y-7">
          <div className="grid gap-7 sm:grid-cols-[120px_1fr]">
            <div>
              <label htmlFor="guests" className={label}>Guests</label>
              <select id="guests" name="guests" defaultValue="1" className={field}>
                {Array.from({ length: 8 }, (_, i) => <option key={i} value={i + 1}>{i + 1}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="guestNames" className={label}>Accompanying guests</label>
              <input id="guestNames" name="guestNames" placeholder="Names, if any" className={field} />
            </div>
          </div>
          <fieldset>
            <legend className={label}>Functions you'll attend</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {wedding.events.map((ev) => {
                const on = events.includes(ev.name);
                return (
                  <button type="button" key={ev.id} aria-pressed={on}
                    onClick={() => setEvents((p) => (on ? p.filter((x) => x !== ev.name) : [...p, ev.name]))}
                    className={`min-h-10 rounded-full border px-4 text-sm transition-colors ${on ? "border-gold bg-accent text-wine" : "border-border hover:border-gold"}`}>
                    {ev.name}
                  </button>
                );
              })}
            </div>
          </fieldset>
          <div>
            <label htmlFor="dietary" className={label}>Dietary preference</label>
            <select id="dietary" name="dietary" className={field} defaultValue="">
              <option value="">No preference</option>
              <option>Vegetarian</option><option>Jain</option><option>Vegan</option><option>Non-vegetarian</option>
            </select>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-8">
            <label className="flex items-center gap-3 text-sm"><input type="checkbox" name="accommodation" className="h-5 w-5 accent-[var(--wine)]" /> I need accommodation</label>
            <label className="flex items-center gap-3 text-sm"><input type="checkbox" name="travel" className="h-5 w-5 accent-[var(--wine)]" /> I need travel assistance</label>
          </div>
        </div>
      )}

      <div>
        <label htmlFor="message" className={label}>Wishes for the couple</label>
        <textarea id="message" name="message" rows={3} maxLength={1000} className={`${field} resize-none`} />
      </div>

      {state === "error" && (
        <p role="alert" className="border border-destructive/40 p-3 text-sm text-destructive">
          We couldn't save your RSVP just now. Your answers are still here — please try again.
        </p>
      )}
      <button type="submit" disabled={state === "loading"}
        className="flex min-h-12 w-full items-center justify-center gap-2 bg-wine px-6 py-3 text-sm uppercase tracking-[0.3em] text-primary-foreground transition hover:opacity-90 active:scale-[.99] disabled:opacity-70">
        {state === "loading" ? (<><Loader2 className="h-4 w-4 animate-spin" /> Sending</>) : "Send RSVP"}
      </button>
    </form>
  );
}
