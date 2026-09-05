import {
  MAP_REGIONS,
  TURKEY_GEO_PATHS,
  CYPRUS_GEO_PATHS,
  MAP_VIEW,
} from '../config/TurkeyMap.js';

import { resolveBadgeTheme } from './LevelBadge.js';

const SVG_NS = 'http://www.w3.org/2000/svg';

export class TurkeyMapView {
  constructor(container, onSelect) {
    this.container = container;
    this.onSelect = onSelect;
    this.unlockedRegions = new Set(['cyprus']);
    this.hoverId = null;
    this.svg = null;
    this._built = false;
  }

  setUnlockedRegions(regions) {
    this.unlockedRegions = regions;
    if (this._built) this._updateMarkers();
  }

  mount() {
    this._build();
    this.draw();
  }

  unmount() {
    this.container?.replaceChildren();
    this._built = false;
  }

  draw() {
    if (!this._built) this._build();
    this._updateMarkers();
  }

  _build() {
    if (!this.container) return;

    const { width: w, height: h } = MAP_VIEW;
    this.container.replaceChildren();

    this.svg = document.createElementNS(SVG_NS, 'svg');
    this.svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    this.svg.setAttribute('class', 'turkey-map-svg');
    this.svg.setAttribute('role', 'img');
    this.svg.setAttribute('aria-label', 'Türkiye ve Kıbrıs haritası');

    const defs = document.createElementNS(SVG_NS, 'defs');
    defs.innerHTML = `
      <linearGradient id="map-sea" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1e40af"/>
        <stop offset="50%" stop-color="#0284c7"/>
        <stop offset="100%" stop-color="#0ea5e9"/>
      </linearGradient>
      <linearGradient id="map-turkey-fill" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#fef9c3"/>
        <stop offset="40%" stop-color="#fde68a"/>
        <stop offset="100%" stop-color="#d97706"/>
      </linearGradient>
      <linearGradient id="map-cyprus-fill" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#bbf7d0"/>
        <stop offset="100%" stop-color="#4ade80"/>
      </linearGradient>
      <filter id="map-shadow" x="-4%" y="-4%" width="108%" height="108%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#0c2340" flood-opacity="0.5"/>
      </filter>
      <filter id="pin-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    `;
    this.svg.appendChild(defs);

    const bg = document.createElementNS(SVG_NS, 'rect');
    bg.setAttribute('width', w);
    bg.setAttribute('height', h);
    bg.setAttribute('fill', 'url(#map-sea)');
    this.svg.appendChild(bg);

    this._addGeoLand(w, h);
    this._addLabels(w, h);
    this._addMarkersLayer();
    this._addFrame(w, h);

    this.container.appendChild(this.svg);
    this._built = true;
  }

  _addGeoLand(w, h) {
    const landGroup = document.createElementNS(SVG_NS, 'g');
    landGroup.setAttribute('filter', 'url(#map-shadow)');

    for (const d of TURKEY_GEO_PATHS) {
      const path = document.createElementNS(SVG_NS, 'path');
      path.setAttribute('d', d);
      path.setAttribute('fill', 'url(#map-turkey-fill)');
      path.setAttribute('stroke', '#92400e');
      path.setAttribute('stroke-width', '1.8');
      path.setAttribute('stroke-linejoin', 'round');
      path.setAttribute('stroke-linecap', 'round');
      landGroup.appendChild(path);
    }

    for (const d of CYPRUS_GEO_PATHS) {
      const path = document.createElementNS(SVG_NS, 'path');
      path.setAttribute('d', d);
      path.setAttribute('fill', 'url(#map-cyprus-fill)');
      path.setAttribute('stroke', '#166534');
      path.setAttribute('stroke-width', '1.6');
      path.setAttribute('stroke-linejoin', 'round');
      landGroup.appendChild(path);
    }

    this.svg.appendChild(landGroup);
  }

  _addLabels(w, h) {
    const labels = [
      { text: 'TÜRKİYE', x: 0.48, y: 0.38, size: 15, bold: true },
      { text: 'KIBRIS', x: MAP_REGIONS.find((r) => r.id === 'cyprus').x, y: 0.82, size: 11 },
      { text: 'KARADENİZ', x: 0.5, y: 0.04, size: 10 },
      { text: 'AKDENİZ', x: 0.42, y: 0.97, size: 10 },
    ];

    for (const lb of labels) {
      const t = document.createElementNS(SVG_NS, 'text');
      t.setAttribute('x', lb.x * w);
      t.setAttribute('y', lb.y * h);
      t.setAttribute('fill', lb.bold ? 'rgba(255,255,255,0.7)' : 'rgba(186,230,253,0.55)');
      t.setAttribute('font-size', lb.size);
      t.setAttribute('font-family', 'sans-serif');
      t.setAttribute('font-weight', lb.bold ? '800' : '600');
      t.setAttribute('text-anchor', 'middle');
      t.setAttribute('pointer-events', 'none');
      t.textContent = lb.text;
      this.svg.appendChild(t);
    }
  }

  _addFrame(w, h) {
    const frame = document.createElementNS(SVG_NS, 'rect');
    frame.setAttribute('x', '3');
    frame.setAttribute('y', '3');
    frame.setAttribute('width', w - 6);
    frame.setAttribute('height', h - 6);
    frame.setAttribute('rx', '8');
    frame.setAttribute('fill', 'none');
    frame.setAttribute('stroke', 'rgba(192,132,252,0.4)');
    frame.setAttribute('stroke-width', '2');
    this.svg.appendChild(frame);
  }

  _addMarkersLayer() {
    this.markersLayer = document.createElementNS(SVG_NS, 'g');
    this.markersLayer.setAttribute('id', 'map-markers');
    this.svg.appendChild(this.markersLayer);
  }

  _updateMarkers() {
    if (!this.markersLayer) return;
    this.markersLayer.replaceChildren();

    const { width: w, height: h } = MAP_VIEW;

    for (const region of MAP_REGIONS) {
      const g = document.createElementNS(SVG_NS, 'g');
      g.setAttribute('class', 'map-marker');
      g.dataset.region = region.id;

      const x = region.x * w;
      const y = region.y * h;
      const unlocked = this.unlockedRegions.has(region.id);
      const hovered = this.hoverId === region.id;

      g.style.cursor = unlocked ? 'pointer' : 'default';

      if (unlocked) {
        const glow = document.createElementNS(SVG_NS, 'circle');
        glow.setAttribute('cx', x);
        glow.setAttribute('cy', y);
        glow.setAttribute('r', hovered ? 22 : 18);
        glow.setAttribute('fill', hovered ? 'rgba(255,107,157,0.5)' : 'rgba(255,107,157,0.25)');
        glow.setAttribute('filter', 'url(#pin-glow)');
        g.appendChild(glow);
      }

      const pin = document.createElementNS(SVG_NS, 'path');
      pin.setAttribute('d', `M ${x} ${y + 12} L ${x - 8} ${y - 2} L ${x + 8} ${y - 2} Z`);
      pin.setAttribute('fill', unlocked ? '#ff6b9d' : '#475569');
      pin.setAttribute('stroke', unlocked ? '#fff' : '#64748b');
      pin.setAttribute('stroke-width', '1.5');
      g.appendChild(pin);

      const dot = document.createElementNS(SVG_NS, 'circle');
      dot.setAttribute('cx', x);
      dot.setAttribute('cy', y - 4);
      dot.setAttribute('r', '4.5');
      dot.setAttribute('fill', unlocked ? '#fff' : '#94a3b8');
      g.appendChild(dot);

      if (unlocked) {
        const theme = resolveBadgeTheme(region.id, region.id);
        const badge = document.createElementNS(SVG_NS, 'rect');
        badge.setAttribute('x', x - 5);
        badge.setAttribute('y', y - 19);
        badge.setAttribute('width', 10);
        badge.setAttribute('height', 10);
        badge.setAttribute('rx', 2);
        badge.setAttribute('fill', theme.top);
        badge.setAttribute('stroke', 'rgba(255,255,255,0.35)');
        badge.setAttribute('stroke-width', '1');
        g.appendChild(badge);
      } else {
        const lock = document.createElementNS(SVG_NS, 'rect');
        lock.setAttribute('x', x - 4);
        lock.setAttribute('y', y - 18);
        lock.setAttribute('width', 8);
        lock.setAttribute('height', 8);
        lock.setAttribute('rx', 1.5);
        lock.setAttribute('fill', 'rgba(26, 15, 46, 0.85)');
        lock.setAttribute('stroke', '#94a3b8');
        lock.setAttribute('stroke-width', '1');
        g.appendChild(lock);
      }

      const name = document.createElementNS(SVG_NS, 'text');
      name.setAttribute('x', x);
      name.setAttribute('y', y + 26);
      name.setAttribute('text-anchor', 'middle');
      name.setAttribute('font-size', '9');
      name.setAttribute('font-weight', '700');
      name.setAttribute('fill', unlocked ? '#fff' : '#94a3b8');
      name.setAttribute('font-family', 'sans-serif');
      name.setAttribute('stroke', unlocked ? 'rgba(0,0,0,0.35)' : 'none');
      name.setAttribute('stroke-width', '0.4');
      name.setAttribute('paint-order', 'stroke');
      name.textContent = region.name;
      g.appendChild(name);

      if (unlocked) {
        g.addEventListener('mouseenter', () => {
          this.hoverId = region.id;
          this._updateMarkers();
        });
        g.addEventListener('mouseleave', () => {
          this.hoverId = null;
          this._updateMarkers();
        });
        g.addEventListener('click', () => this.onSelect(region.id));
        g.addEventListener('touchend', (e) => {
          e.preventDefault();
          this.onSelect(region.id);
        });
      }

      this.markersLayer.appendChild(g);
    }
  }
}
