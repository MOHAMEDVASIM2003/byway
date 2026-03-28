import { configureStore } from '@reduxjs/toolkit';
import userdetailreducer from './slice/Userdetailslice';
import userlearningreducer from './slice/userlearnslice';

const store = configureStore({
  reducer: {
    userdetail: userdetailreducer,     
    userlearn: userlearningreducer
     
  }
});

export default store;
