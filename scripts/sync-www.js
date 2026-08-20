import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const www = path.join(root, 'www');
const items = ['index.html', 'manifest.webmanifest', 'sw.js', '.nojekyll', 'css', 'js', 'assets'];

function copyItem(name) {
  const source = path.join(root, name);
  if (!fs.existsSync(source)) return;
  const target = path.join(www, name);
  fs.cpSync(source, target, { recursive: true });
}

if (fs.existsSync(www)) fs.rmSync(www, { recursive: true, force: true });
fs.mkdirSync(www, { recursive: true });

for (const item of items) copyItem(item);

console.log('Web dosyalari www/ klasorune kopyalandi.');
