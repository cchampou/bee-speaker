
const { ADJUST_FRAMES, ADJUST_SUPERS, TAKE_NOTE, ADJUST_WEIGHT, ADJUST_BROOD } = require('./actions');

const initialState = {
  23: {
    supers: 0,
    frames: 10,
    text: 'En pleine forme !',
    weight: 26,
    brood: 'beaucoup'
  },
  4: {
    supers: 1,
    frames: 10,
    text: ''
  },
};

const reducer = (state = initialState, action) => {
  const { beehive, frames, supers, text, weight, quantity } = action;
  switch (action.type) {
    case ADJUST_FRAMES:
      return {
        ...state,
        [beehive]: {
          ...state[beehive],
          frames: parseInt(frames),
        }
      };
    case ADJUST_SUPERS:
      return {
        ...state,
        [beehive]: {
          ...state[beehive],
          supers: parseInt(supers),
        }
      };
    case ADJUST_BROOD:
      return {
        ...state,
        [beehive]: {
          ...state[beehive],
          brood: quantity,
        }
      };
    case TAKE_NOTE:
      return {
        ...state,
        [beehive]: {
          ...state[beehive],
          text,
        }
      };
    case ADJUST_WEIGHT:
      return {
        ...state,
        [beehive]: {
          ...state[beehive],
          weight,
        }
      };
    default:
      return state;
  }
};

module.exports = reducer;
