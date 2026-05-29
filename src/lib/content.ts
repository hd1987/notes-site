import { getCollection } from "astro:content";
import { buildNoteRecords, sortNoteRecords, type NoteRecord } from "./notes";

export async function getNoteRecords(): Promise<NoteRecord[]> {
  const entries = await getCollection("notes");
  return sortNoteRecords(buildNoteRecords(entries));
}
