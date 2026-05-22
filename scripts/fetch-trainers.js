'use strict'
const BASE = 'https://play.pokemonshowdown.com/sprites/trainers/'
const fs = require('fs')
const path = require('path')

main().catch(e => { console.error(e); process.exit(1) })

async function main() {
  const res = await fetch(BASE)
  if (!res.ok) { console.error('Fetch failed:', res.status); process.exit(1) }
  const html = await res.text()
  const seen = new Set()
  const names = []
  for (const m of html.matchAll(/([a-z][-a-z0-9]*(?:[-_][a-z0-9]+)*[a-z0-9]\.png)/gi)) {
    const n = m[1]
    if (!seen.has(n)) { seen.add(n); names.push(n) }
  }
  const data = names.sort().map(n => ({
    label: n.replace('.png', '').replace(/-/g, ' '),
    value: BASE + n
  }))
  const outPath = path.resolve(__dirname, '..', 'src', 'trainers.json')
  fs.writeFileSync(outPath, JSON.stringify(data, null, 2), 'utf8')
  console.log(`Wrote ${data.length} trainer sprites → ${outPath}`)
}
