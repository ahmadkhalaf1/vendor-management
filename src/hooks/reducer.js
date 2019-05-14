import { SET_VENDORS, SET_LOADING, SET_EDITED_HOUSES, SET_ERROR } from "./type";

export const initialState = {
  vendors: [],
  editedHouses: {
    update: []
  },
  loading: true
};

export const Reducer = (state, { vendors, type, loading, editedHouses, error }) => {
  switch (type) {
    case SET_VENDORS:
      return {
        ...state,
        vendors,
      };
    case SET_EDITED_HOUSES:
      return {
        ...state,
        editedHouses,
      };
    case SET_LOADING:
      return {
        ...state,
        loading,
      };
    case SET_ERROR:
      return {
        ...state,
        error,
      };

    default:
      return state;
  }
};