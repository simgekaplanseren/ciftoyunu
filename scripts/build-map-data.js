import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const tur = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'geo/TUR.geo.json'), 'utf8'),
);
const cyp = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'geo/CYP.geo.json'), 'utf8'),
);

const BOUNDS = { minLon: 25.5, maxLon: 45.8, minLat: 34.4, maxLat: 42.3 };
const VIEW = { width: 900, height: 560, padding: 28 };

function project([lon, lat]) {
  const pw = VIEW.width - VIEW.padding * 2;
  const ph = VIEW.height - VIEW.padding * 2;
  return [
    VIEW.padding + ((lon - BOUNDS.minLon) / (BOUNDS.maxLon - BOUNDS.minLon)) * pw,
    VIEW.padding + ((BOUNDS.maxLat - lat) / (BOUNDS.maxLat - BOUNDS.minLat)) * ph,
  ];
}

function ringPath(ring) {
  return ring
    .map((c, i) => {
      const [x, y] = project(c);
      return `${i ? 'L' : 'M'}${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(' ') + ' Z';
}

function featurePaths(geom) {
  if (geom.type === 'Polygon') return [ringPath(geom.coordinates[0])];
  return geom.coordinates.map((poly) => ringPath(poly[0]));
}

const turkeyPaths = featurePaths(tur.features[0].geometry);
const cyprusPaths = featurePaths(cyp.features[0].geometry);

const cityCoords = {
  istanbul: [28.9784, 41.0082],
  izmir: [27.1428, 38.4237],
  kusadasi: [27.2568, 37.8575],
  gaziantep: [37.0662, 37.3833],
  cyprus: [33.3823, 35.1856],
};

const cities = {};
for (const [id, coord] of Object.entries(cityCoords)) {
  const [x, y] = project(coord);
  cities[id] = {
    x: +(x / VIEW.width).toFixed(4),
    y: +(y / VIEW.height).toFixed(4),
    lon: coord[0],
    lat: coord[1],
  };
}

const out = `/** Gerçek coğrafi sınır verisi — Natural Earth / world.geo.json (WGS84) */
export const MAP_BOUNDS = ${JSON.stringify(BOUNDS, null, 2)};

export const MAP_VIEW = ${JSON.stringify(VIEW, null, 2)};

/** Türkiye sınırı — SVG path (Anadolu + Trakya) */
export const TURKEY_GEO_PATHS = ${JSON.stringify(turkeyPaths, null, 2)};

/** Kıbrıs adası sınırı — SVG path */
export const CYPRUS_GEO_PATHS = ${JSON.stringify(cyprusPaths, null, 2)};

/** Şehir konumları — gerçek enlem/boylamdan projeksiyon */
export const MAP_CITY_COORDS = ${JSON.stringify(cities, null, 2)};
`;

fs.writeFileSync(
  path.join(__dirname, '../js/config/TurkeyMapGeo.js'),
  out,
  'utf8',
);

console.log('Wrote TurkeyMapGeo.js');
console.log('Turkey polygons:', turkeyPaths.length);
console.log('Cyprus polygons:', cyprusPaths.length);
