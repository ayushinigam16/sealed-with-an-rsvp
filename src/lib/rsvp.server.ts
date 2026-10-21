// RSVPs are appended to the "RSVP Responses" Google Sheet by a Google Apps Script web app.
// RSVP_SHEET_WEBHOOK_URL is the script's /exec URL, set as a Netlify environment variable.
export async function appendRsvpRow(row: (string | number)[]) {
  const url = process.env["RSVP_SHEET_WEBHOOK_URL"];
  if (!url) throw new Error("RSVP sheet webhook is not configured");
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ row }),
    redirect: "follow",
  });
  const body = await res.text();
  let ok = false;
  try {
    ok = res.ok && JSON.parse(body).ok === true;
  } catch {
    ok = false;
  }
  if (!ok) {
    console.error(`Sheets append failed [${res.status}]: ${body.slice(0, 500)}`);
    throw new Error(`Sheets append failed [${res.status}]`);
  }
}
