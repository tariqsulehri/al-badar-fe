import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  party: null,
  id: false,
};

const partySlice = createSlice({
  name: "party",
  initialState,
  reducers: {
    setParty: (state,  action) => {
      const {key, value} = action.payload;
      state[key]= value
    },

    setId: (state, action) => {
      const {key, value} = action.payload;
      state[key]= value
    }
  },
});

export const { setParty, setId} = partySlice.actions;
export default  partySlice.reducer;
