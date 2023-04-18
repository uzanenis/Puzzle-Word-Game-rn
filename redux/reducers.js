import { ADD_POINT } from "./actions";

const initialState = {
  points: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POINT:
      return {
        ...state,
        points: [...state.points, action.payload],
      };
    default:
      return state;
  }
};

export default rootReducer;
