import { getNoteRecords } from "../lib/content";
import { buildSearchDocuments } from "../lib/search";

export async function GET() {
  const records = await getNoteRecords();

  return new Response(JSON.stringify(buildSearchDocuments(records)), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}
