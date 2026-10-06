# Ayush & Rajavi — Luxury Wedding Invitation

A single-page, mobile-first digital invitation (no "Our Story" section) in ivory, champagne gold and deep wine.

## Details used
- Couple: Ayush & Rajavi
- Wedding: 20 November 2026, Varanasi (time placeholder 7:00 PM, editable)
- Mehendi, Haldi, Sangeet, Wedding — Ramada Varanasi
- Reception — Eternity by Taj, Kanpur
- Event dates/times besides the wedding day are placeholders (e.g. 18–20 Nov, reception 22 Nov) until you share real ones.

## Experience (top to bottom)
1. Opening screen: "You're Invited", names, date, Varanasi, invitation line, wine wax-seal "Open Invitation" button. Tapping cracks the seal, card fades/scales away, petals drift.
2. Couple section with ornamental divider and blessings line.
3. Live countdown styled as an engraved card; switches to "Today, we celebrate love." after the date.
4. Celebration Details: editorial cards for each function (date, day, times, venue, address, dress code, description, Directions).
5. Venues: Ramada Varanasi and Eternity by Taj Kanpur with Google Maps buttons.
6. Wedding quote section.
7. Family blessings (bride's and groom's parents — placeholder names).
8. Gallery: masonry with lightbox, lazy-loaded placeholder photos easy to swap.
9. RSVP form (all requested fields, validation, loading, error, thank-you state, duplicate protection) saving to your Google Sheet.
10. Share: WhatsApp, copy link, native share.
11. Floating music toggle (no autoplay, remembers choice) and compact floating menu: Home, Events, Venue, Gallery, RSVP.

## Design
- Cormorant Garamond (names/headings) + Jost (text), paper-grain texture, fine gold linework, soft shadows.
- Fade-up reveals, line-drawing dividers, gentle shimmer; reduced-motion respected.
- Share preview image with names + date; per-page title and description.

## Google Sheets
- You connect your Google account via a connect card.
- On first RSVP the app creates (or reuses) a private spreadsheet "Ayush & Rajavi — RSVPs" with tabs: RSVP Responses (all requested columns), Event Attendance and Summary (auto formulas).
- Success shown only after the row is saved; credentials stay on the server.

## Technical details
- All content in one config file (`src/config/wedding.ts`), events data-driven.
- TanStack Start route `/`, server function `submitRsvp` with zod validation, calling Sheets API through the connector gateway (`GOOGLE_SHEETS_API_KEY` + `LOVABLE_API_KEY`); spreadsheet ID stored via a secret or created and logged once.
- RSVP ID = timestamp + random; client keeps ID to avoid double submit.
- Generated images: wax seal, floral ornaments, OG image, placeholder gallery photos; music placeholder at `public/music.mp3`.
