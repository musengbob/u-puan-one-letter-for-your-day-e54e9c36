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

import { chmodSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LETTER = "K";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LETTER, "utf8");
// The grader collects outputs as another user than the one this program
// runs as, so the file must stay world-readable: enforce mode 0644 and
// verify it, rather than trusting the process umask.
chmodSync(outPath, 0o644);
if ((statSync(outPath).mode & 0o777) !== 0o644) {
  throw new Error(`entry file mode is not 0644: ${outPath}`);
}

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
