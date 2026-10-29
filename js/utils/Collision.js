export function aabbOverlap(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

export function resolvePlatformCollision(entity, platform) {
  if (!aabbOverlap(entity, platform)) return false;

  const platTop = platform.y;
  const platBottom = platform.y + platform.height;
  const platLeft = platform.x;
  const platRight = platform.x + platform.width;

  const prevBottom = entity.prevY + entity.height;
  const prevTop = entity.prevY;
  const entityBottom = entity.y + entity.height;
  const entityTop = entity.y;
  const entityRight = entity.x + entity.width;

  const overlapLeft = entityRight - platLeft;
  const overlapRight = platRight - entity.x;
  const overlapTop = entityBottom - platTop;
  const overlapBottom = platBottom - entityTop;

  // Üstten iniş (öncelikli)
  if (
    entity.vy >= 0 &&
    prevBottom <= platTop + 8 &&
    entityBottom >= platTop - 2 &&
    entity.x + 4 < platRight &&
    entityRight - 4 > platLeft
  ) {
    entity.y = platTop - entity.height;
    entity.vy = 0;
    entity.grounded = true;
    entity.onPlatform = platform;
    return true;
  }

  // Alttan çarpma (zıplarken)
  if (entity.vy < 0 && prevTop >= platBottom - 6 && entityTop <= platBottom + 2) {
    entity.y = platBottom;
    entity.vy = 0;
    return true;
  }

  // Yan çarpışmalar
  if (overlapLeft < overlapRight && overlapLeft < overlapTop && overlapLeft < overlapBottom) {
    entity.x = platLeft - entity.width;
    entity.vx = 0;
    return true;
  }

  if (overlapRight <= overlapLeft && overlapRight < overlapTop && overlapRight < overlapBottom) {
    entity.x = platRight;
    entity.vx = 0;
    return true;
  }

  return false;
}

export function pointInRect(px, py, rect) {
  return px >= rect.x && px <= rect.x + rect.width && py >= rect.y && py <= rect.y + rect.height;
}

export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function lerp(a, b, t) {
  return a + (b - a) * t;
}
