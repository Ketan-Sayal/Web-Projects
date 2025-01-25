// Don't use async function here!
// Use them in main pages only in useEffect
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  posts: [],
};

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
      getAllPosts:(state, action) =>{
        state.posts = action.payload;
      },
    },
});

export const {getAllPosts} = postSlice.actions;

export default postSlice.reducer;