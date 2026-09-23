const fs = require("fs");
const path = require("path");

const outputDir = __dirname;
const width = 1800;
const left = 220;
const right = 1560;
const top = 95;
const gridTop = 140;
const rowTop = 230;
const rowHeight = 48;
const rowGap = 44;
const labelInset = 18;
const labelWidth = 190;

const commonLayouts = {
  amsterdam: [["a1", "a5"]],
  athens: [["a1", "b4"], ["b5", "a5"]],
  berlin: [["a1", "a3"], ["a3", "a4"], ["b5", "a5"]],
  bern: [["a1", "a3"], ["b4", "b5"], ["b5", "a5"]],
  copenhagen: [["a1", "a2"], ["b3", "b4"], ["b4", "a4"], ["a4", "a5"]],
  cardiff: [["a1", "a3"], ["a3", "b5"], ["b5", "a5"]],
  dublin: [["a1", "b2"], ["a2", "a4"], ["b5", "a5"]],
  helsinki: [["a1", "b3"], ["a3", "b5"], ["b5", "a5"]],
  london: [["a1", "b2"], ["a2", "a3"], ["b4", "a4"], ["a4", "a5"]],
  madrid: [["a1", "b4"], ["b4", "a4"], ["b5", "a5"]],
  paris: [["a1", "a3"], ["b4", "a5"]],
  rome: [["a1", "a3"], ["a3", "a5"]],
  stockholm: [["a1", "b2"], ["b3", "b4"], ["b5", "a5"]]
};

const compactLayouts = {
  ...commonLayouts,
  athens: [["a1", "b3"], ["a4", "a5"]],
  berlin: [["a1", "a3"], ["a3", "b3"], ["a4", "a5"]],
  bern: [["a1", "a3"], ["b3", "a4"], ["a4", "a5"]],
  copenhagen: [["a1", "a2"], ["b2", "a3"], ["a3", "a4"], ["a4", "a5"]],
  cardiff: [["a1", "a3"], ["a3", "a4"], ["a4", "a5"]],
  dublin: [["a1", "b2"], ["b2", "a4"], ["a4", "a5"]],
  helsinki: [["a1", "b2"], ["b2", "a4"], ["a4", "a5"]],
  london: [["a1", "b2"], ["a2", "a3"], ["a3", "a4"], ["a4", "a5"]],
  madrid: [["a1", "a3"], ["a3", "a4"], ["a4", "a5"]],
  paris: [["a1", "a3"], ["b3", "a5"]],
  stockholm: [["a1", "b2"], ["b2", "b3"], ["a4", "a5"]]
};

const diagrams = [
  {
    filename: "grid-4-5.svg",
    title: "4+5",
    tracks: [
      { size: 4, start: ["a1"], end: ["b2"] },
      { size: 1, start: ["b2"], end: ["a2"] },
      { size: 3, start: ["a2"], end: ["b3"] },
      { size: 2, start: ["b3"], end: ["a3"] },
      { size: 2, start: ["a3"], end: ["b4"] },
      { size: 3, start: ["b4"], end: ["a4"] },
      { size: 1, start: ["a4"], end: ["b5"] },
      { size: 4, start: ["b5"], end: ["a5"] }
    ],
    layouts: commonLayouts
  },
  {
    filename: "grid-4-6.svg",
    title: "4+6",
    tracks: [
      { size: 2, start: ["a1"], end: ["b2"] },
      { size: 1, start: ["b2"], end: ["a2"] },
      { size: 1, start: ["a2"], end: ["b3"] },
      { size: 2, start: ["b3"], end: ["a3", "b4"] },
      { size: 2, start: ["a3", "b4"], end: ["b5"] },
      { size: 1, start: ["b5"], end: ["a4"] },
      { size: 1, start: ["a4"], end: ["b6"] },
      { size: 2, start: ["b6"], end: ["a5"] }
    ],
    layouts: commonLayouts
  },
  {
    filename: "grid-3-4.svg",
    title: "3+4",
    tracks: [
      { size: 3, start: ["a1"], end: ["a2"] },
      { size: 1, start: ["a2"], end: ["b2"] },
      { size: 2, start: ["b2"], end: ["a3"] },
      { size: 2, start: ["a3"], end: ["b3"] },
      { size: 1, start: ["b3"], end: ["a4"] },
      { size: 3, start: ["a4"], end: ["a5"] }
    ],
    layouts: compactLayouts
  }
];

function getLines(tracks) {
  const total = tracks.reduce((sum, track) => sum + track.size, 0);
  const lines = new Map();
  let cursor = 0;

  for (const track of tracks) {
    for (const name of track.start) {
      lines.set(name, cursor);
    }

    cursor += track.size;

    for (const name of track.end) {
      lines.set(name, cursor);
    }
  }

  return {
    lineNames: Array.from(lines.keys()),
    linePositions: Object.fromEntries(Array.from(lines, ([name, position]) => [
      name,
      left + ((right - left) * position / total)
    ])),
    total
  };
}

function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function trackMarkup(tracks, linePositions) {
  const fills = [];
  const lines = [];
  let index = 0;

  for (const track of tracks) {
    const start = linePositions[track.start[0]];
    const end = linePositions[track.end[0]];

    fills.push(`<rect class="track ${index % 2 === 0 ? "track-a" : "track-b"}" x="${start.toFixed(2)}" y="${gridTop}" width="${(end - start).toFixed(2)}" height="1310"/>`);
    index += 1;
  }

  const seen = new Set();
  for (const track of tracks) {
    for (const names of [track.start, track.end]) {
      const x = linePositions[names[0]];
      const key = names.join(" ");

      if (seen.has(key)) {
        continue;
      }

      seen.add(key);
      lines.push(`<line class="grid-line" x1="${x.toFixed(2)}" x2="${x.toFixed(2)}" y1="${gridTop}" y2="1450"/>`);
      lines.push(`<text class="line-label" x="${x.toFixed(2)}" y="${top}">${esc(names.join(" "))}</text>`);
    }
  }

  return `${fills.join("\n")}\n${lines.join("\n")}`;
}

function layoutMarkup(layouts, linePositions) {
  const rows = Object.entries(layouts);

  return rows.map(([name, spans], rowIndex) => {
    const y = rowTop + (rowIndex * (rowHeight + rowGap));
    const label = `<text class="layout-label" x="${left + labelInset}" y="${y + 32}">${esc(name.toUpperCase())}</text>`;
    const rects = spans.map(([startName, endName]) => {
      const x = linePositions[startName];
      const end = linePositions[endName];
      const width = end - x;

      return `<rect class="layout-box" x="${x.toFixed(2)}" y="${y}" width="${width.toFixed(2)}" height="${rowHeight}"/>`;
    });

    return `<g>\n${rects.join("\n")}\n${label}\n</g>`;
  }).join("\n");
}

function makeSvg(diagram) {
  const { linePositions } = getLines(diagram.tracks);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} 1550" role="img" aria-labelledby="title desc">
<title id="title">${esc(diagram.title)} compound grid layout recipes</title>
<desc id="desc">Corrected ${esc(diagram.title)} grid diagram showing named grid lines and city-based layout spans.</desc>
<style>
svg {
background: #000;
color: #fff;
font-family: "Arial Black", "Arial Bold", sans-serif; }
.title {
fill: #fff;
font-size: 32px;
font-weight: 900; }
.line-label {
fill: #fff;
font-size: 28px;
font-weight: 900;
text-anchor: middle;
text-transform: uppercase; }
.layout-label {
fill: #fff;
font-size: 26px;
font-weight: 900;
letter-spacing: .02em;
text-transform: uppercase; }
.layout-box {
fill: transparent;
stroke: #fff;
stroke-width: 2; }
.track-a {
fill: #1a1a1a; }
.track-b {
fill: #242424; }
.grid-line {
stroke: #383838;
stroke-width: 28; }
</style>
<rect width="${width}" height="1550" fill="#000"/>
<text class="title" x="24" y="36">${esc(diagram.title)}</text>
${trackMarkup(diagram.tracks, linePositions)}
<text class="title" fill-opacity=".16" x="${(left + right) / 2}" y="250" text-anchor="middle">Compound grid</text>
${layoutMarkup(diagram.layouts, linePositions)}
</svg>
`;
}

for (const diagram of diagrams) {
  fs.writeFileSync(path.join(outputDir, diagram.filename), makeSvg(diagram));
}

console.log(`Generated ${diagrams.length} grid diagrams in ${path.relative(process.cwd(), outputDir)}`);
