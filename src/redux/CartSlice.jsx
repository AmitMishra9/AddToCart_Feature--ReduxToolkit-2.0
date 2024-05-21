import { createSlice } from "@reduxjs/toolkit";

const cartSlice= createSlice({
   name:"Add_Cart",
   initialState:[],
   reducers:{
      add(state,action){
          state.push(action.payload)
         // const ItemIndex =state.carts.findIndex
      },
      remove(state, action) {
        return state.filter((item) => item.id !== action.payload);
      }
   }
    
})

export  const {add,remove}=cartSlice.actions;
export default cartSlice.reducer;