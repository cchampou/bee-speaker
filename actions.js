
const ADJUST_SUPERS = 'ADJUST_SUPERS';
const adjustSupers = (beehive, supers) => ({
  type: ADJUST_SUPERS,
  beehive,
  supers,
});

const ADJUST_FRAMES = 'ADJUST_FRAMES';
const adjustFrames = (beehive, frames) => ({
  type: ADJUST_FRAMES,
  beehive,
  frames,
});

const TAKE_NOTE = 'TAKE_NOTE';
const takeNote = (beehive, text) => ({
  type: TAKE_NOTE,
  beehive,
  text,
});

const ADJUST_WEIGHT = 'ADJUST_WEIGHT';
const adjustWeight = (beehive, weight) => ({
  type: ADJUST_WEIGHT,
  beehive,
  weight,
});

const ADJUST_BROOD = 'ADJUST_BROOD';
const adjustBrood = (beehive, quantity) => ({
  type: ADJUST_BROOD,
  beehive,
  quantity,
});

module.exports = {
  ADJUST_SUPERS,
  adjustSupers,
  ADJUST_FRAMES,
  adjustFrames,
  TAKE_NOTE,
  takeNote,
  ADJUST_WEIGHT,
  adjustWeight,
  ADJUST_BROOD,
  adjustBrood,
};