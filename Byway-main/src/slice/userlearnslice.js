import { createSlice } from "@reduxjs/toolkit";

const initialState = [{holder:'',courses:[]}];

const Userlearnslice = createSlice({
  name: 'userlearn',
  initialState,
  reducers: {
    initialdata: (state, action) => {
      return action.payload; // Replace state entirely
    },
    newcourse: (state, action) => {
      state.courses.push(action.payload); // Add new course to array
    }
  }
});

export const { initialdata, newcourse } = Userlearnslice.actions;
export default Userlearnslice.reducer;
