import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import ts from 'typescript';

const root = resolve(import.meta.dirname, '..');
const productsPath = resolve(root, 'src/data/products.json');
const snapshotPath = resolve(root, 'src/data/products.snapshot.json');
const statusPath = resolve(root, 'public/data/feed-status.json');

async function loadAdapter(relativePath) {
  const filename = resolve(root, relativePath);
  const source = await readFile(filename, 'utf8');
  const output = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
    fileName: filename,
  }).outputText;
  return import(`data:text/javascript;base64,${Buffer.from(output).toString('base64')}`);
}

const snapshot = JSON.parse(await readFile(snapshotPath, 'utf8'));
const snapshotBySource = Map.groupBy(snapshot, (product) => product.source);
const statuses = {};
let products = [];

const sources = [{
  name: 'klockrummet',
  fetch: async () => {
    if (!process.env.KLOCKRUMMET_FEED_URL) throw new Error('KLOCKRUMMET_FEED_URL saknas');
    const adapter = await loadAdapter('src/lib/feeds/klockrummet.ts');
    return adapter.fetchKlockrummetProducts(process.env.KLOCKRUMMET_FEED_URL);
  },
}];

for (const source of sources) {
  const fallback = snapshotBySource.get(source.name) ?? [];
  try {
    const fetched = await source.fetch();
    if (fallback.length > 0 && fetched.length < fallback.length / 2) {
      throw new Error(`${source.name} minskade från ${fallback.length} till ${fetched.length} produkter (>50 %)`);
    }
    products.push(...fetched);
    statuses[source.name] = { updatedAt: new Date().toISOString(), count: fetched.length, status: 'ok' };
    console.log(`${source.name}: ${fetched.length} produkter`);
  } catch (error) {
    if (String(error).includes('>50 %')) throw error;
    if (fallback.length === 0) throw error;
    products.push(...fallback);
    statuses[source.name] = { updatedAt: new Date().toISOString(), count: fallback.length, status: 'snapshot', error: String(error) };
    console.warn(`${source.name}: använder snapshot med ${fallback.length} produkter (${error})`);
  }
}

await mkdir(resolve(root, 'public/data'), { recursive: true });
await writeFile(productsPath, `${JSON.stringify(products, null, 2)}\n`);
await writeFile(statusPath, `${JSON.stringify({ generatedAt: new Date().toISOString(), sources: statuses }, null, 2)}\n`);
