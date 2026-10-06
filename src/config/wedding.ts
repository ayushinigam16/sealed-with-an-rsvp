// Central wedding configuration — edit everything here.
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";

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
  venue: "Ramada Plaza by Wyndham",
  address: "The Mall, Cantonment, Varanasi, Uttar Pradesh 221002",
  mapsQuery: "Ramada Plaza by Wyndham Varanasi",
};
const taj = {
  venue: "Eternity by Taj",
  address: "Kanpur, Uttar Pradesh",
  mapsQuery: "Eternity by Taj Kanpur",
};

export const wedding = {
  bride: "Rajavi",
  groom: "Ayush",
  // Ceremony start, India time
  dateTimeISO: "2026-11-20T19:00:00+05:30",
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
    bride: { title: "The Bride's Family", parents: "Mr. & Mrs. Parent Name", note: "Daughter of" },
    groom: { title: "The Groom's Family", parents: "Mr. & Mrs. Parent Name", note: "Son of" },
  },
  events: [
    { id: "mehendi", name: "Mehendi", date: "2026-11-18", start: "4:00 PM", end: "8:00 PM", ...ramada,
      description: "An afternoon of henna, music and laughter as we begin the celebrations.", dressCode: "Greens & florals" },
    { id: "haldi", name: "Haldi", date: "2026-11-19", start: "10:00 AM", end: "1:00 PM", ...ramada,
      description: "A joyous morning of turmeric, blessings and marigolds.", dressCode: "Shades of yellow" },
    { id: "sangeet", name: "Sangeet", date: "2026-11-19", start: "7:30 PM", end: "11:30 PM", ...ramada,
      description: "An evening of song, dance and family performances.", dressCode: "Indo-western glamour" },
    { id: "wedding", name: "Wedding Ceremony", date: "2026-11-20", start: "7:00 PM", end: "Late", ...ramada,
      description: "The sacred pheras, followed by dinner under the stars.", dressCode: "Traditional Indian" },
    { id: "reception", name: "Reception", date: "2026-11-22", start: "7:30 PM", end: "11:00 PM", ...taj,
      description: "Celebrate the newlyweds at an elegant evening in Kanpur.", dressCode: "Formal / festive" },
  ] as WeddingEvent[],
  venues: [
    { name: ramada.venue, city: "Varanasi", address: ramada.address, mapsQuery: ramada.mapsQuery,
      description: "Home to the Mehendi, Haldi, Sangeet and Wedding Ceremony, a short drive from the ancient ghats.", image: g3 },
    { name: taj.venue, city: "Kanpur", address: taj.address, mapsQuery: taj.mapsQuery,
      description: "The setting for our Reception, a graceful evening to toast the beginning.", image: g4 },
  ],
  gallery: [
    { src: g1, alt: "Varanasi ghats at golden dusk", w: 1024, h: 1280 },
    { src: g2, alt: "Mehendi hands holding petals", w: 1024, h: 1024 },
    { src: g3, alt: "Floral mandap lit by candles", w: 1024, h: 768 },
    { src: g4, alt: "Couple holding hands at sunset", w: 1024, h: 1280 },
  ],
  shareMessage:
    "We're delighted to invite you to celebrate the wedding of Ayush & Rajavi on 20 November 2026 in Varanasi. Please join us ❤️",
  musicSrc: "/music.mp3", // replace with your own track in /public
};

export const mapsUrl = (q: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
