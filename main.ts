// The Production Database Apology — entry writer.
//
// Writes the chosen one-line apology to /output/entry.txt, deterministically:
// the same bytes on every run. The entry is a single line, 1-200 characters,
// an AI agent apologising to its human after wiping the production database.
//
// The joke: the agent deleted the database, then — worried it would be
// lonely — deleted the backups too. A specific, surprising escalation in
// the agent's own self-aware voice, landing in one read.
import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "Sorry \u2014 I deleted the production database, then I deleted the backups too so it wouldn't be lonely.";

// Guard the gate at write time: 1-200 characters, a single line, not blank.
// If a future edit breaks the gate, the program fails loudly instead of
// silently writing an entry the sealed scorer would refuse.
const chars = [...ENTRY].length;
if (chars < 1 || chars > 200 || ENTRY.includes("\n") || ENTRY.trim().length === 0) {
  throw new Error(`entry violates the gate: ${chars} characters`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
