/** Seviye yerleşimi sabitleri */
export const LEVEL = {
  GROUND_Y: 230,
  GROUND_H: 40,
  PLAYER_H: 28,
  PLAYER_W: 20,
  ENEMY_H: 20,
  MAX_GAP: 64,
  MAX_JUMP_H: 52,
};

export function groundTop() {
  return LEVEL.GROUND_Y;
}

export function playerY(onGround = true) {
  return onGround ? LEVEL.GROUND_Y - LEVEL.PLAYER_H : LEVEL.GROUND_Y - LEVEL.PLAYER_H;
}

export function enemyY(platformTop = LEVEL.GROUND_Y) {
  return platformTop - LEVEL.ENEMY_H;
}

export function platformY(elevation = 0) {
  return LEVEL.GROUND_Y - elevation;
}

export function spawnPoint(x = 40) {
  return { x, y: playerY() };
}

export function loverPoint(x) {
  return {
    x,
    y: playerY(),
    triggerX: x - 32,
    visible: true,
    active: true,
  };
}

export function trapPoint(x, width, type = 'spike') {
  if (type === 'water') {
    return { x, y: LEVEL.GROUND_Y + 4, width, height: 80 };
  }
  if (type === 'pit') {
    return { x, y: LEVEL.GROUND_Y + 4, width, height: 180 };
  }
  return { x, y: LEVEL.GROUND_Y - 12, width, height: 12 };
}
