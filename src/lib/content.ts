import { getCollection } from "astro:content";
import { buildNoteRecords, sortNoteRecords } from "./notes";

export async function getNoteContent() {
  const entries = await getCollection("notes");
  return { entries, notes: sortNoteRecords(buildNoteRecords(entries)) };
}

export async function getNoteRecords() {
  return (await getNoteContent()).notes;
}
