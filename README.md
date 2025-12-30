# Sarkari-Result-api

Sarkari-Result-api is a small set of TypeScript scraper scripts that fetch and parse job/results-related pages from sarkariresult.com.cm using `node-fetch` (or the global `fetch`) and `cheerio`.

Each script in `src/` targets a different section of the site and prints a simple list of items to the console in this shape:

```json
{
  "index": 0,
  "text": "Some post title",
  "link": "https://..."
}
```

Supported scripts (in `src/`):
- `latest-job.ts` — latest jobs
- `result.ts` — results
- `admission.ts` — admissions
- `admit-card.ts` — admit cards
- `answer-key.ts` — answer keys
- `syllabus.ts` — syllabus

## Prerequisites
- Node.js 18+ (includes global `fetch`) or earlier Node.js with a `fetch` polyfill
- pnpm (recommended) or npm/yarn

## Installation

Install dependencies:

```bash
pnpm install
# or
# npm install
```

## Quick start — run a script

The TypeScript files in `src/` are small runnable scripts (they define an async function and call it). You have a few easy ways to run them:

1) Using `ts-node` (run TypeScript directly)

```bash
# install ts-node and typescript (dev)
pnpm add -D typescript ts-node @types/node

# run a script (example)
npx ts-node --esm src/latest-job.ts
```

2) Compile then run with Node

```bash
# install typescript if you don't have it
pnpm add -D typescript @types/node

# create a simple tsconfig.json (or use your own), then compile
npx tsc

# run the compiled JS
node dist/src/latest-job.js
```

3) If you run on Node.js 18+ you can replace the TypeScript files with equivalent JavaScript or run them after compiling. The scripts use `fetch` and `cheerio` to get and parse HTML.

Example output (each script logs entries like):

```json
{ "index": 0, "text": "Some post title", "link": "https://..." }
```

## Using the code as a library

Currently the scripts print results to the console. If you want to use the parsing logic from another module, refactor each script to export a function that returns parsed items instead of logging. Example pattern (TypeScript):

```ts
// src/lib/latest-job.ts
import * as cheerio from 'cheerio';

export async function fetchLatestJobs(): Promise<Array<{ index: number; text: string; link?: string }>> {
  const res = await fetch('https://sarkariresult.com.cm/latest-jobs/');
  const html = await res.text();
  const $ = cheerio.load(html);
  const items: Array<{ index: number; text: string; link?: string }> = [];

  $('ul.latest-posts-last-date li').each((i, el) => {
    items.push({
      index: i,
      text: $(el).text().trim(),
      link: $(el).find('a').attr('href') ?? undefined
    });
  });

  return items;
}
```

Then import and use it in your app:

```ts
import { fetchLatestJobs } from './src/lib/latest-job';

(async () => {
  const jobs = await fetchLatestJobs();
  console.log(jobs);
})();
```

## Notes & tips
- The site may block or rate-limit repeated scraping. Add delays or caching if you call these often.
- If a script fails with `fetch` errors on older Node.js versions, install and import `node-fetch` or upgrade Node to 18+.
- Consider adding proper error handling and tests before using this in production.

## Contributing
- Feel free to open issues or submit PRs that (a) convert the scripts into reusable exported functions, (b) add a small CLI, or (c) add unit tests.

## License
- ISC (see `package.json`)
