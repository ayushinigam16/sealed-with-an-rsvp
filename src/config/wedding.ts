// Central wedding configuration — edit everything here.
import venueRamada from "@/assets/venue-ramada.jpg";
import venueTaj from "@/assets/venue-taj.jpg";
import pHands from "@/3d12980e-2c77-4cea-a1e6-8aa79d5a8742.jpeg";
import pCafe from "@/1d1e6874-3a1d-4203-a07b-e747c0bd5e01.jpeg";
import pSelfie from "@/29e69a24-ea53-4359-8085-df579b400e5a.jpeg";
import pHome from "@/02a8c3b2-c4fe-44cd-9e34-59901ca3d35b.jpeg";
import pFestive from "@/4932f84d-308d-45b7-b9d0-95c1cc7ef601.jpeg";
import pMusic from "@/Flute Version Tujh Mein Rab Dikhta Hai Rab Ne Bana Di Jodi Salim-Sulaiman Jaideep Vijay Tambe.mp3";

export type WeddingEvent = {
  id: string;
  name: string;
  date: string; // ISO date YYYY-MM-DD
  start: string;
  end: string;
  venue: string;
  address: string;
  mapsQuery: string;
  description: string;
  dressCode: string;
};

const ramada = {
  venue: "Ramada Plaza by Wyndham JHV Varanasi",
  address: "The Mall, Cantonment, Varanasi, Uttar Pradesh 221002",
  mapsQuery: "https://share.google/8nOBbVRWvN0xmShgk",
};
const taj = {
  venue: "Eternity by Taj Group",
  address: "Gram Baikunthpur, Sadar, Kanpur, New Kanpur City, Uttar Pradesh 208017",
  mapsQuery: "https://share.google/fqo0eGtq4LnmuTLyq",
};

export const wedding = {
  bride: "Rajavi",
  groom: "Ayush",
  // Ceremony start, India time
  dateTimeISO: "2026-11-20T20:00:00+05:30",
  dateLabel: "20 November 2026",
  city: "Varanasi",
  invitePhrase: "You're Invited",
  inviteLine:
    "Together with our families, we joyfully invite you to celebrate our wedding.",
  blessingsLine: "With the blessings of our families",
  quote: "Two hearts, two families, one beautiful beginning.",
  quoteSub: "Your presence is the only gift we ask for.",
  countdownDoneMessage: "Today, we celebrate love.",
  families: {
    bride: { title: "The Bride's Family", parents: "Dr. Sujata Lakhtakia & Dr. Pankaj Lakhtakia", note: "Daughter of" },
    groom: { title: "The Groom's Family", parents: "Anju Nigam & Dr. Akhilesh Ji Nigam", note: "Son of" },
  },
  events: [
    { id: "mehendi", name: "Mehndi", date: "2026-11-19", start: "1:00 PM", end: "onwards", ...ramada,
      description: "An afternoon of henna, music and laughter as we begin the celebrations.", dressCode: "Green" },
    { id: "sangeet", name: "Sangeet", date: "2026-11-19", start: "7:30 PM", end: "onwards", ...ramada,
      description: "An evening of song, dance and family performances.", dressCode: "Glittery & Indo-western" },
    { id: "haldi", name: "Haldi", date: "2026-11-20", start: "12:00 PM", end: "onwards", ...ramada,
      description: "A joyous afternoon of turmeric, blessings and marigolds.", dressCode: "Yellow, magenta & pink" },
    { id: "wedding", name: "Wedding Ceremony", date: "2026-11-20", start: "8:00 PM", end: "onwards", ...ramada,
      description: "The sacred pheras, followed by dinner under the stars.", dressCode: "Traditional Indian" },
    { id: "reception", name: "Reception", date: "2026-11-22", start: "7:30 PM", end: "onwards", ...taj,
      description: "Celebrate the newlyweds at an elegant evening in Kanpur.", dressCode: "Formal / festive" },
  ] as WeddingEvent[],
  venues: [
    { name: ramada.venue, city: "Varanasi", address: ramada.address, mapsQuery: ramada.mapsQuery,
      description: "Home to the Mehendi, Haldi, Sangeet and Wedding Ceremony, a short drive from the ancient ghats.", image: venueRamada },
    { name: taj.venue, city: "Kanpur", address: taj.address, mapsQuery: taj.mapsQuery,
      description: "The setting for our Reception, a graceful evening to toast the beginning.", image: venueTaj },
  ],
  gallery: [
    { src: pHands, alt: "Ayush and Rajavi holding hands", w: 1000, h: 1500 },
    { src: pHome, alt: "Ayush and Rajavi together at home", w: 1200, h: 1600 },
    { src: pCafe, alt: "Ayush and Rajavi smiling together at a café", w: 1200, h: 1600 },
    { src: pSelfie, alt: "Ayush and Rajavi smiling in a selfie", w: 1200, h: 1600 },
    { src: pFestive, alt: "Ayush and Rajavi with sindoor on their foreheads", w: 1200, h: 1600 },
  ],
  shareMessage:
    "We're delighted to invite you to celebrate the wedding of Ayush & Rajavi on 20 November 2026 in Varanasi. Please join us ❤️",
  musicSrc: pMusic, // "Tujh Mein Rab Dikhta Hai" (flute version) — plays via the floating music button
};

export const mapsUrl = (q: string) =>
  q.startsWith("https://") ? q : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
