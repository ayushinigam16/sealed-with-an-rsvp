const GATEWAY = "https://connector-gateway.lovable.dev/google_sheets/v4";
const SHEET_ID = "18ZO_AFf32rph_pxcGanPciJkrqYjknOLfQ3Txxba2Uo";

export async function appendRsvpRow(row: (string | number)[]) {
  const lovable = process.env["LOVABLE_API_KEY"];
  const sheets = process.env["GOOGLE_SHEETS_API_KEY"];
  if (!lovable || !sheets) throw new Error("Google Sheets is not connected");
  const res = await fetch(
    `${GATEWAY}/spreadsheets/${SHEET_ID}/values/'RSVP Responses'!A:O:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovable}`,
        "X-Connection-Api-Key": sheets,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values: [row] }),
    },
  );
  if (!res.ok) {
    const body = await res.text();
    console.error(`Sheets append failed [${res.status}]: ${body}`);
    throw new Error(`Sheets append failed [${res.status}]`);
  }
}
