/** Bölüm / seviye listesi — emoji yerine renk rozeti */

const THEMES = {
  cyprus: { top: '#e8dcc8', body: '#7a6348' },
  gaziantep: { top: '#fdba74', body: '#c2410c' },
  izmir: { top: '#7dd3fc', body: '#0369a1' },
  istanbul: { top: '#f9a8d4', body: '#be185d' },
  lefkosa: { top: '#fda4af', body: '#9d174d' },
  girne: { top: '#f9a8d4', body: '#9d174d' },
  magusa: { top: '#fbcfe8', body: '#be185d' },
  dipkarpaz: { top: '#fb7185', body: '#9d174d' },
  hayvanat: { top: '#fdba74', body: '#9a3412' },
  iconova: { top: '#fbcfe8', body: '#9d174d' },
  petpark: { top: '#e9d5ff', body: '#6b21a8' },
  sehitkamil: { top: '#c4b5fd', body: '#4c1d95' },
  alsancak: { top: '#fbcfe8', body: '#9d174d' },
  kusadasi: { top: '#f9a8d4', body: '#be185d' },
  sirince: { top: '#fde68a', body: '#b45309' },
  selcuk: { top: '#ddd6fe', body: '#6d28d9' },
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
