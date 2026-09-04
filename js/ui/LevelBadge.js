/** Bölüm / seviye listesi — emoji yerine renk rozeti */

const THEMES = {
  cyprus: { top: '#e8dcc8', body: '#7a6348' },
  gaziantep: { top: '#fdba74', body: '#c2410c' },
  izmir: { top: '#7dd3fc', body: '#0369a1' },
  istanbul: { top: '#f9a8d4', body: '#be185d' },
  lefkosa: { top: '#d4a574', body: '#6b5344' },
  girne: { top: '#89cff0', body: '#1e5f74' },
  magusa: { top: '#fde68a', body: '#92400e' },
  dipkarpaz: { top: '#fb923c', body: '#9a3412' },
  hayvanat: { top: '#86efac', body: '#166534' },
  iconova: { top: '#c4b5fd', body: '#5b21b6' },
  petpark: { top: '#4ade80', body: '#15803d' },
  sehitkamil: { top: '#94a3b8', body: '#334155' },
  alsancak: { top: '#fde68a', body: '#a16207' },
  kusadasi: { top: '#67e8f9', body: '#0e7490' },
  sirince: { top: '#fcd34d', body: '#a16207' },
  selcuk: { top: '#e7e5e4', body: '#57534e' },
  dogumgunu: { top: '#fda4af', body: '#9d174d' },
};

export function resolveBadgeTheme(themeId, sectionId) {
  return THEMES[themeId] || THEMES[sectionId] || THEMES.cyprus;
}

export function createLevelBadge(themeId, sectionId, label = '') {
  const theme = resolveBadgeTheme(themeId, sectionId);
  const el = document.createElement('span');
  el.className = 'level-badge';
  el.style.setProperty('--badge-top', theme.top);
  el.style.setProperty('--badge-body', theme.body);
  el.setAttribute('aria-hidden', 'true');
  if (label) {
    const inner = document.createElement('span');
    inner.className = 'level-badge-label';
    inner.textContent = label;
    el.appendChild(inner);
  }
  return el;
}
