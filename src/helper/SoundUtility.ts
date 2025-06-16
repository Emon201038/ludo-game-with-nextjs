type SoundName = 'dice_roll' | 'cheer' | 'game_start' | 'collide' | 'home_win' | 'pile_move' | 'safe_spot' | 'ui' | 'home' | 'girl2'
export const playSound = (soundName: SoundName, loop = false) => {
  try {
    const sound = new Audio(getSoundPath(soundName));
    sound.currentTime = 0;
    sound.loop = loop;
    sound.play();
  } catch (e) {
    console.log(`cannot play the sound file`, e);
  }
};

const getSoundPath = (soundName: SoundName) => {
  switch (soundName) {
    case 'dice_roll':
      return "/sfx/dice_roll.mp3";
    case 'cheer':
      return "/sfx/cheer.mp3";
    case 'game_start':
      return "/sfx/game_start.mp3";
    case 'collide':
      return "/sfx/collide.mp3";
    case 'home_win':
      return "/sfx/home_win.mp3";
    case 'pile_move':
      return "/sfx/pile_move.mp3";
    case 'safe_spot':
      return "/sfx/safe_spot.mp3";
    case 'ui':
      return "/sfx/ui.mp3";
    case 'home':
      return "/sfx/home.mp3";
    case 'girl2':
      return "/sfx/girl2.mp3";
    default:
      throw new Error(`Sound ${soundName} not found`);
  }
};
