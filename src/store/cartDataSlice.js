
import { createSlice } from "@reduxjs/toolkit";

const initialState={
    cartItem:[],
    cartTotlQuantity:0,
    cartTotalAmout:0
};
const cartDataSlice=createSlice({
    name:"cartData",
    initialState,
    reducers:{
        addToCart(state,action){
            const existingIndex=state.cartItem.findIndex(
                (item)=>item.id===action.payload.id
            );

            
            if(existingIndex>=0){
                state.cartItem[existingIndex]={
                    ...state.cartItem[existingIndex],
                    cartQuantity:state.cartItem[existingIndex].cartQuantity+1
                }
            }else{
                let tempProductItem={...action.payload,cartQuantity:1};
                state.cartItem.push(tempProductItem);
            }
        },
        removeFromCart(state,action){
             
        }
    }

})