import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  slidesForPptx: [],
};

const slidesForPptxSlice = createSlice({
  name: "slidesForPptx",
  initialState,
  reducers: {
    // Add slides to the selectedSlides array
    addSlide: (state, { payload }) => {
      // console.log(" slidesForPptx --->",payload);
      return {
        ...state,
        slidesForPptx: [...payload], // Replace or update the Redux state with the selected data
      };
    },

    // Remove a specific slide from the array
    removeSlide: (state, { payload }) => {
      state.slidesForPptx = state.slidesForPptx.filter((slide) => slide.id !== payload.id);
    },

    // Optionally clear all slides
    clearSlides: (state) => {
      state.slidesForPptx = [];
    },
    listSlides: (state) => {
      state.slidesForPptx = [];
    },
  },
});

// Export actions
export const { addSlide, removeSlide, clearSlides } = slidesForPptxSlice.actions;

// Export reducer
export default slidesForPptxSlice.reducer;
