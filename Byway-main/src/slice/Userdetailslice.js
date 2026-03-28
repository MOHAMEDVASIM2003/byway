import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const Userdetailslice = createSlice({
  name: 'userdetail',
  initialState,
  reducers: {
    initialdata: (state, action) => action.payload
  }
});

export const { initialdata } = Userdetailslice.actions;
export default Userdetailslice.reducer;
