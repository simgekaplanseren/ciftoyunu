/**
 * Asset yapılandırması — görselleri ve sesleri buradan kolayca değiştirebilirsin.
 * Kendi sprite'larını eklemek için `useCustomSprites: true` yap ve path'leri güncelle.
 */
export const ASSETS = {
  useCustomSprites: false,

  images: {
    player: 'assets/images/player.png',
    playerAttack: 'assets/images/player_attack.png',
    lover: 'assets/images/lover.png',
    enemy: 'assets/images/enemy.png',
    boss: 'assets/images/boss.png',
    heart: 'assets/images/heart.png',
    key: 'assets/images/key.png',
    photoPiece: 'assets/images/photo_piece.png',
    platform: 'assets/images/platform.png',
    spike: 'assets/images/spike.png',
    door: 'assets/images/door.png',
    backgroundForest: 'assets/images/bg_forest.png',
    backgroundCave: 'assets/images/bg_cave.png',
    backgroundCastle: 'assets/images/bg_castle.png',
  },

  audio: {
    musicMenu: 'assets/audio/music_menu.mp3',
    musicForest: 'assets/audio/music_forest.mp3',
    musicCave: 'assets/audio/music_cave.mp3',
    musicCastle: 'assets/audio/music_castle.mp3',
    musicBoss: 'assets/audio/music_boss.mp3',
    sfxJump: 'assets/audio/sfx_jump.mp3',
    sfxAttack: 'assets/audio/sfx_attack.mp3',
    sfxCollect: 'assets/audio/sfx_collect.mp3',
    sfxHurt: 'assets/audio/sfx_hurt.mp3',
    sfxEnemyHit: 'assets/audio/sfx_enemy_hit.mp3',
    sfxDoor: 'assets/audio/sfx_door.mp3',
    sfxVictory: 'assets/audio/sfx_victory.mp3',
    sfxBossHit: 'assets/audio/sfx_boss_hit.mp3',
  },
};

export const CHARACTERS = {
  girl: { id: 'girl', name: 'Mira', companionName: 'Deniz', loverName: 'Deniz', emoji: '' },
  fadil: { id: 'fadil', name: 'Deniz', companionName: 'Mira', loverName: 'Mira', emoji: '' },
};

export const REUNION_MESSAGES = [
  'Aşk, bir kalbe dokunmadan önce o kalbin nasıl atığını dinlemektir.',
  'Gerçek yakınlık, birini süslemek değil; onu gerçekten tanımaya razı olmaktır.',
  'Sevgi, karşındaki insanda kendi hayalini değil, onun halini görmektir.',
  'Bir kalbin kıymetini bilmeden ona sahip olmaya çalışma.',
  'Güven, yüksek sesle söylenmez; yanında durulunca anlaşılır.',
  'Verilen söz, ancak adımın onu doğruladığı yerde anlam kazanır.',
  'Sadakat, göz önündeyken değil, kimse görmezken de seçtiğin insana ait kalmaktır.',
  'Bir kalbin sana inanmasını hafife alma; o inanç, sessizce emanet edilir.',
  'Saygı, sevdiğin insanın duygusunu kendi rahatından üstün tutabilmektir.',
  'Sınır, soğukluk değildir; bir kalbin nasıl özen istediğini söylemesidir.',
  'Aşk, özel günde parlamak değil; sıradan bir günde de hatırlamaktır.',
  'Güzel söz bir kapı açabilir; dürüstlük o kapının ardından durur.',
  'Aşk, “seni seviyorum” demek değil; o sözün arkasında durmaktır.',
];

export const FINAL_SCREEN = {
  title: 'Aşk burada başlar. ❤️',
  message: 'Aşk yalnızca “seni seviyorum” demek değildir. O sözün arkasında durmak, güveni korumak, dürüst olmak, sınırlara saygı göstermek ve sevdiğin insanın kalbine her gün emek vermektir. Aşkın güzelliği ne kadar parlak başladığında değil; ne kadar sorumlu ve ne kadar sadakatle yaşandığında saklıdır.',
};

export const GAME_CONFIG = {
  width: 480,
  height: 270,
  gravity: 900,
  tileSize: 16,
  maxHearts: 3,
  invincibilityTime: 1.5,
  attackDuration: 0.25,
  attackCooldown: 0.4,
};

export const COLORS = {
  playerBody: '#ff6b9d',
  playerHair: '#4a1942',
  playerSkin: '#ffd5c8',
  loverBody: '#c084fc',
  loverHair: '#2d1b4e',
  enemyBody: '#6b7280',
  enemyEye: '#ef4444',
  bossBody: '#7f1d1d',
  bossEye: '#fbbf24',
  platform: '#4ade80',
  platformDark: '#166534',
  spike: '#ef4444',
  heart: '#ff6b9d',
  key: '#fbbf24',
  skyForest: ['#1a0f2e', '#2d1b4e', '#4a1942'],
  skyCave: ['#0f0f1a', '#1a1a2e', '#2d2d44'],
  skyCastle: ['#0f1a3d', '#1e1b4b', '#312e81'],
  fadilBody: '#3b82f6',
  fadilHair: '#1e293b',
  fadilPants: '#1e3a5f',
};
