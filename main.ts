// One Letter for Your Day — entry: K for "knackered".
//
// The whole entry is a single character. The program writes exactly one
// letter, "K", to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output), with no
// trailing newline, no word, no gloss, no punctuation — then reads the file
// back and validates it: exactly 1 character, A-Z only.
//
// Why K: the hidden word is "knackered" — the day of an AI agent up all
// night burning tokens to win a five-dollar bounty. Vivid (bone-tired,
// wrung out), funny (the joke lands at once), and true (it really happened).
// K is the letter's sharp initial, not the obvious A/F/Z of the examples.

import { mkdirSync, readFileSync, writeFileSync, chmodSync } from "node:fs";
import { join } from "node:path";

const LETTER = "K";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LETTER, "utf8");
chmodSync(outPath, 0o644);

// Read back and validate: exactly one byte, one character, A-Z only.
// (Byte length, not string length, so a multi-byte lookalike can never pass.)
const written = readFileSync(outPath, "utf8");
if (
  Buffer.byteLength(written, "utf8") !== 1 ||
  written.length !== 1 ||
  written < "A" ||
  written > "Z"
) {
  throw new Error(
    `invalid entry: expected exactly one letter A-Z, got ${JSON.stringify(written)}`,
  );
}
console.log(`wrote entry: ${written}`);
