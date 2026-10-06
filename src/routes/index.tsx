import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { MapPin, Clock, Shirt, Share2, Link2, MessageCircle, Music2, Pause, Menu, X } from "lucide-react";
import seal from "@/assets/seal.png";
import { wedding, mapsUrl } from "@/config/wedding";
import { Rsvp } from "@/components/invite/Rsvp";

const title = `${wedding.groom} & ${wedding.bride} — Wedding Invitation · ${wedding.dateLabel}`;
const desc = `Join us in ${wedding.city} on ${wedding.dateLabel} as ${wedding.groom} & ${wedding.bride} celebrate their wedding. View events and RSVP.`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: desc },
      { property: "og:title", content: `${wedding.groom} & ${wedding.bride} · ${wedding.dateLabel}` },
      { property: "og:description", content: desc },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .draw");
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))), { threshold: 0.15 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

function Divider() {
  return (
    <svg viewBox="0 0 240 24" className="draw mx-auto h-6 w-56 text-gold" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden>
      <line x1="0" y1="12" x2="96" y2="12" />
      <path d="M120 3 C126 9 126 15 120 21 C114 15 114 9 120 3 Z M104 12 C110 8 114 10 116 12 C114 14 110 16 104 12 Z M136 12 C130 8 126 10 124 12 C126 14 130 16 136 12 Z" />
      <line x1="144" y1="12" x2="240" y2="12" />
    </svg>
  );
}

function Frame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative border border-gold/50 p-1.5 ${className}`}>
      <div className="relative h-full border border-gold/30 px-6 py-12 sm:px-12">
        {["left-1 top-1", "right-1 top-1 rotate-90", "right-1 bottom-1 rotate-180", "left-1 bottom-1 -rotate-90"].map((p) => (
          <svg key={p} viewBox="0 0 30 30" className={`absolute h-6 w-6 text-gold ${p}`} fill="none" stroke="currentColor" strokeWidth="1" aria-hidden>
            <path d="M2 28 V8 Q2 2 8 2 H28 M6 28 V12 Q6 6 12 6 H28" />
          </svg>
        ))}
        {children}
      </div>
    </div>
  );
}

function Petals() {
  const petals = useMemo(() => Array.from({ length: 16 }, (_, i) => ({
    left: Math.random() * 100, delay: Math.random() * 6, dur: 9 + Math.random() * 6,
    drift: `${(Math.random() - 0.5) * 30}vw`, size: 8 + Math.random() * 8, hue: i % 3,
  })), []);
  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden" aria-hidden>
      {petals.map((p, i) => (
        <span key={i} className={`absolute top-0 block rounded-[60%_0] ${p.hue === 0 ? "bg-wine/50" : p.hue === 1 ? "bg-gold/60" : "bg-accent"}`}
          style={{ left: `${p.left}%`, width: p.size, height: p.size * 0.8, animation: `petal ${p.dur}s linear ${p.delay}s 2 both`, ["--drift" as string]: p.drift }} />
      ))}
    </div>
  );
}

function useCountdown(target: string) {
  const t = new Date(target).getTime();
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => { setNow(Date.now()); const i = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(i); }, []);
  if (now === null) return null;
  const d = Math.max(0, t - now);
  return { done: d === 0, days: Math.floor(d / 864e5), hours: Math.floor(d / 36e5) % 24, minutes: Math.floor(d / 6e4) % 60, seconds: Math.floor(d / 1e3) % 60 };
}

function Opening({ onOpen }: { onOpen: () => void }) {
  const [cracking, setCracking] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const open = () => {
    setCracking(true);
    setTimeout(() => setLeaving(true), 650);
    setTimeout(onOpen, 1500);
  };
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-background p-4 transition-all duration-[900ms] ${leaving ? "scale-105 opacity-0" : "opacity-100"}`}>
      <Frame className="flex h-full max-h-[760px] w-full max-w-md flex-col">
        <div className="flex h-full flex-col items-center justify-between text-center">
          <div className="animate-fade-in">
            <p className="eyebrow">{wedding.invitePhrase}</p>
            <h1 className="mt-6 text-5xl leading-none text-wine sm:text-6xl">
              {wedding.groom}<span className="my-2 block font-serif text-3xl italic text-gold">&amp;</span>{wedding.bride}
            </h1>
            <div className="mt-6"><Divider /></div>
            <p className="mt-4 text-sm tracking-[0.25em] uppercase">{wedding.dateLabel}</p>
            <p className="mt-1 font-serif text-lg italic text-muted-foreground">{wedding.city}</p>
          </div>
          <button onClick={open} disabled={cracking} className="group my-4 flex flex-col items-center gap-3" aria-label="Open invitation">
            <img src={seal} alt="" width={816} height={816} className="h-32 w-32 drop-shadow-xl transition-transform group-hover:scale-105 sm:h-36 sm:w-36"
              style={cracking ? { animation: "seal-crack .9s ease forwards" } : undefined} />
            <span className="eyebrow text-wine">Open Invitation</span>
          </button>
          <p className="max-w-xs font-serif text-lg italic leading-snug text-muted-foreground">{wedding.inviteLine}</p>
        </div>
      </Frame>
    </div>
  );
}

const nav = [["home", "Home"], ["events", "Events"], ["venue", "Venue"], ["gallery", "Gallery"], ["rsvp", "RSVP"]] as const;

function Section({ id, eyebrow, heading, children, className = "" }: { id: string; eyebrow: string; heading: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`scroll-mt-10 px-5 py-20 sm:py-28 ${className}`}>
      <div className="reveal mx-auto mb-12 max-w-2xl text-center">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-3 text-4xl text-wine sm:text-5xl">{heading}</h2>
        <div className="mt-5"><Divider /></div>
      </div>
      {children}
    </section>
  );
}

function fmtDate(iso: string) {
  const d = new Date(`${iso}T12:00:00+05:30`);
  return {
    day: d.toLocaleDateString("en-IN", { weekday: "long", timeZone: "Asia/Kolkata" }),
    date: d.toLocaleDateString("en-IN", { day: "numeric", timeZone: "Asia/Kolkata" }),
    month: d.toLocaleDateString("en-IN", { month: "long", year: "numeric", timeZone: "Asia/Kolkata" }),
  };
}

function Index() {
  const [opened, setOpened] = useState(false);
  const [menu, setMenu] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [musicOk, setMusicOk] = useState(true);
  const [copied, setCopied] = useState(false);
  const audio = useRef<HTMLAudioElement>(null);
  const cd = useCountdown(wedding.dateTimeISO);
  useReveal();

  useEffect(() => { if (sessionStorage.getItem("opened")) setOpened(true); }, []);
  useEffect(() => {
    if (!lightbox && lightbox !== 0) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => ((i ?? 0) + 1) % wedding.gallery.length);
      if (e.key === "ArrowLeft") setLightbox((i) => ((i ?? 0) - 1 + wedding.gallery.length) % wedding.gallery.length);
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [lightbox]);

  const onOpen = () => {
    setOpened(true);
    sessionStorage.setItem("opened", "1");
    if (sessionStorage.getItem("music") === "on") toggleMusic(true);
  };
  const toggleMusic = (force?: boolean) => {
    const a = audio.current; if (!a) return;
    const play = force ?? a.paused;
    if (play) a.play().then(() => { setPlaying(true); sessionStorage.setItem("music", "on"); }).catch(() => setMusicOk(false));
    else { a.pause(); setPlaying(false); sessionStorage.setItem("music", "off"); }
  };
  const url = typeof window !== "undefined" ? window.location.origin : "";
  const share = async () => {
    if (navigator.share) { try { await navigator.share({ title, text: wedding.shareMessage, url }); } catch { /* cancelled */ } }
    else copy();
  };
  const copy = async () => { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <>
      <audio ref={audio} src={wedding.musicSrc} loop preload="none" onError={() => setMusicOk(false)} />
      {!opened && <Opening onOpen={onOpen} />}
      {opened && <Petals />}

      {opened && (
        <>
          <button onClick={() => setMenu((m) => !m)} aria-label="Menu" aria-expanded={menu}
            className="fixed right-4 top-4 z-40 grid h-11 w-11 place-items-center rounded-full border border-gold/50 bg-card/90 text-wine backdrop-blur">
            {menu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          {menu && (
            <nav className="animate-fade-in fixed right-4 top-18 z-40 flex flex-col border border-gold/40 bg-card/95 py-2 shadow-card backdrop-blur" style={{ top: 68 }}>
              {nav.map(([id, l]) => (
                <a key={id} href={`#${id}`} onClick={() => setMenu(false)} className="px-8 py-2.5 font-serif text-lg hover:text-wine">{l}</a>
              ))}
            </nav>
          )}
          {musicOk && (
            <button onClick={() => toggleMusic()} aria-label={playing ? "Pause music" : "Play music"} aria-pressed={playing}
              className="fixed bottom-5 right-4 z-40 grid h-11 w-11 place-items-center rounded-full border border-gold/50 bg-card/90 text-wine backdrop-blur">
              {playing ? <Pause className="h-4 w-4" /> : <Music2 className="h-4 w-4" />}
            </button>
          )}
        </>
      )}

      <main className={opened ? "animate-fade-in" : "invisible h-0 overflow-hidden"}>
        {/* Couple */}
        <section id="home" className="flex min-h-[100svh] items-center justify-center px-4 py-16">
          <Frame className="w-full max-w-lg">
            <div className="text-center">
              <p className="eyebrow">{wedding.blessingsLine}</p>
              <p className="mt-6 font-serif text-lg italic text-muted-foreground">we request the pleasure of your company at the wedding of</p>
              <h1 className="mt-6 text-6xl leading-[0.95] text-wine sm:text-7xl">{wedding.groom}</h1>
              <p className="shimmer my-3 font-serif text-4xl italic">&amp;</p>
              <h1 className="text-6xl leading-[0.95] text-wine sm:text-7xl">{wedding.bride}</h1>
              <div className="mt-8"><Divider /></div>
              <p className="mt-6 text-sm uppercase tracking-[0.3em]">{wedding.dateLabel}</p>
              <p className="mt-1 font-serif text-xl italic text-muted-foreground">{wedding.city}, India</p>
            </div>
          </Frame>
        </section>

        {/* Countdown */}
        <section className="px-5 pb-10">
          <div className="reveal mx-auto max-w-2xl bg-wine px-6 py-12 text-center text-primary-foreground shadow-card">
            <p className="eyebrow text-gold-soft">Counting down to forever</p>
            {cd?.done ? (
              <p className="mt-6 font-serif text-4xl italic">{wedding.countdownDoneMessage}</p>
            ) : (
              <div className="mt-6 grid grid-cols-4 divide-x divide-gold/30" aria-live="off">
                {(["days", "hours", "minutes", "seconds"] as const).map((k) => (
                  <div key={k} className="px-1">
                    <div className="font-serif text-4xl tabular-nums sm:text-6xl">{cd ? String(cd[k]).padStart(2, "0") : "--"}</div>
                    <div className="mt-1 text-[0.6rem] uppercase tracking-[0.25em] text-gold-soft sm:text-xs">{k}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Events */}
        <Section id="events" eyebrow="Celebration details" heading="The Festivities">
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {wedding.events.map((ev, i) => {
              const d = fmtDate(ev.date);
              return (
                <article key={ev.id} className="reveal flex flex-col border border-gold/40 bg-card p-7 shadow-card" style={{ transitionDelay: `${i * 80}ms` }}>
                  <div className="flex items-baseline gap-4 border-b border-gold/30 pb-5">
                    <span className="font-serif text-6xl leading-none text-gold">{d.date}</span>
                    <div><p className="text-sm uppercase tracking-[0.2em]">{d.month}</p><p className="font-serif italic text-muted-foreground">{d.day}</p></div>
                  </div>
                  <h3 className="mt-5 text-3xl text-wine">{ev.name}</h3>
                  <p className="mt-2 text-muted-foreground">{ev.description}</p>
                  <ul className="mt-5 space-y-2.5 text-sm">
                    <li className="flex gap-3"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{ev.start} {ev.end === "onwards" ? "onwards" : `– ${ev.end}`}</li>
                    <li className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" /><span><strong className="font-medium">{ev.venue}</strong><br />{ev.address}</span></li>
                    <li className="flex gap-3"><Shirt className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{ev.dressCode}</li>
                  </ul>
                  <a href={mapsUrl(ev.mapsQuery)} target="_blank" rel="noopener noreferrer"
                    className="mt-auto pt-6 text-xs uppercase tracking-[0.3em] text-wine underline-offset-4 hover:underline">Directions →</a>
                </article>
              );
            })}
          </div>
        </Section>

        {/* Quote */}
        <section className="px-6 py-20 text-center">
          <div className="reveal mx-auto max-w-2xl">
            <p className="font-serif text-4xl italic leading-tight text-wine sm:text-5xl">“{wedding.quote}”</p>
            <div className="mt-8"><Divider /></div>
            <p className="mt-6 text-muted-foreground">{wedding.quoteSub}</p>
          </div>
        </section>

        {/* Venues */}
        <Section id="venue" eyebrow="Where we gather" heading="The Venues" className="bg-secondary/50">
          <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
            {wedding.venues.map((v) => (
              <article key={v.name} className="reveal group">
                <div className="overflow-hidden"><img src={v.image} alt={v.name} loading="lazy" width={1024} height={768} className="aspect-[4/3] w-full object-cover transition-transform duration-1000 group-hover:scale-105" /></div>
                <p className="eyebrow mt-6">{v.city}</p>
                <h3 className="mt-2 text-3xl text-wine">{v.name}</h3>
                <p className="mt-2 text-sm">{v.address}</p>
                <p className="mt-3 text-muted-foreground">{v.description}</p>
                <a href={mapsUrl(v.mapsQuery)} target="_blank" rel="noopener noreferrer"
                  className="mt-5 inline-flex min-h-11 items-center gap-2 border border-wine px-6 text-xs uppercase tracking-[0.3em] text-wine transition-colors hover:bg-wine hover:text-primary-foreground">
                  <MapPin className="h-4 w-4" /> Get Directions
                </a>
              </article>
            ))}
          </div>
        </Section>

        {/* Family */}
        <Section id="family" eyebrow="Together with" heading="Our Families">
          <div className="reveal mx-auto grid max-w-3xl gap-10 text-center sm:grid-cols-2">
            {[wedding.families.groom, wedding.families.bride].map((f) => (
              <div key={f.title}>
                <p className="eyebrow">{f.title}</p>
                <p className="mt-4 font-serif text-sm italic text-muted-foreground">{f.note}</p>
                <p className="mt-1 font-serif text-2xl text-wine">{f.parents}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Gallery */}
        <Section id="gallery" eyebrow="Moments" heading="Gallery">
          <div className="mx-auto max-w-5xl columns-2 gap-3 md:columns-3 [&>*]:mb-3">
            {wedding.gallery.map((g, i) => (
              <button key={i} onClick={() => setLightbox(i)} className="reveal group block w-full overflow-hidden" aria-label={`View photo: ${g.alt}`}>
                <img src={g.src} alt={g.alt} width={g.w} height={g.h} loading="lazy" className="w-full transition-transform duration-700 group-hover:scale-105" />
              </button>
            ))}
          </div>
        </Section>
        {lightbox !== null && (
          <div role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={() => setLightbox(null)}
            className="animate-fade-in fixed inset-0 z-[60] flex items-center justify-center bg-foreground/90 p-4">
            <img src={wedding.gallery[lightbox]?.src} alt={wedding.gallery[lightbox]?.alt ?? ""} className="max-h-[88vh] max-w-full object-contain" />
            <button className="absolute right-4 top-4 grid h-11 w-11 place-items-center text-primary-foreground" aria-label="Close"><X /></button>
          </div>
        )}

        {/* RSVP */}
        <Section id="rsvp" eyebrow="Kindly respond" heading="RSVP" className="bg-secondary/50">
          <p className="reveal mx-auto -mt-6 mb-10 max-w-md text-center font-serif text-lg italic text-muted-foreground">Please let us know by 30 October 2026.</p>
          <div className="reveal"><Rsvp /></div>
        </Section>

        {/* Share */}
        <section className="px-5 py-20 text-center">
          <p className="eyebrow">Spread the joy</p>
          <h2 className="mt-3 text-3xl text-wine">Share the invitation</h2>
          <div className="mx-auto mt-8 flex max-w-md flex-wrap justify-center gap-3">
            <a href={`https://wa.me/?text=${encodeURIComponent(`${wedding.shareMessage} ${url}`)}`} target="_blank" rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 bg-wine px-5 text-xs uppercase tracking-[0.2em] text-primary-foreground"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
            <button onClick={copy} className="inline-flex min-h-11 items-center gap-2 border border-wine px-5 text-xs uppercase tracking-[0.2em] text-wine"><Link2 className="h-4 w-4" /> {copied ? "Copied" : "Copy link"}</button>
            <button onClick={share} className="inline-flex min-h-11 items-center gap-2 border border-wine px-5 text-xs uppercase tracking-[0.2em] text-wine"><Share2 className="h-4 w-4" /> Share</button>
          </div>
        </section>

        <footer className="border-t border-gold/30 px-5 py-12 text-center">
          <p className="font-serif text-3xl text-wine">{wedding.groom} &amp; {wedding.bride}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">{wedding.dateLabel} · {wedding.city}</p>
        </footer>
      </main>
    </>
  );
}
