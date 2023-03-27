
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItem: [],
    cartTotlQuantity: 0,
    cartTotalAmout: 0
};
const cartDataSlice = createSlice({
    name: "cartData",
    initialState,
    reducers: {
        addToCartt(state, action) {
            const existingIndex = state.cartItem.findIndex(
                (item) => item.id === action.payload.id
            );


            if (existingIndex >= 0) {
                state.cartItem[existingIndex] = {
                    ...state.cartItem[existingIndex],
                    cartQuantity: state.cartItem[existingIndex].cartQuantity + 1
                }
            } else {
                let tempProductItem = { ...action.payload, cartQuantity: 1 };
                state.cartItem.push(tempProductItem);
            }
            console.log("addToCart:")
            console.log(state.cartItem);
        },
        decreaseCartt(state, action) {
            // console.log("Datatt:");
            // alert("hello");
            const itemIndex = state.cartItem.findIndex((item) => item.id === action.payload);
            // let tempProductItem = { ...action.payload, cartQuantity: 1 };
            if (state.cartItem[itemIndex].cartQuantity > 1) {
                state.cartItem[itemIndex].cartQuantity -= 1;
            } else if (state.cartItem[itemIndex].cartQuantity === 1) {
                const nextCartItems = state.cartItem.filter((item) => item.id !== action.payload);
                state.cartItem = nextCartItems;
            }
            console.log("Remove Data:");
        },
        removeFromCartt(state, action) {
            const items = state.cartItem.filter((item) => item.id !== action.payload.id);
            state.cartItem = items;

        },
        getTotals(state) {
            let { total, quantity } = state.cartItem.reduce(
                (cartTotal, Item) => {
                    const { price, cartQuantity } = Item;
                    const itemTotal = price * cartQuantity;
                    cartTotal.total += itemTotal;
                    cartTotal.quantity += cartQuantity;
                    return cartTotal;
                },
                {
                    total: 0,
                    quantity: 0
                }
            );

            total = parseFloat(total.toFixed(2));
            state.cartTotalAmout = total;
            state.cartTotlQuantity=quantity;
            console.log("total rs;");
            console.log(state.cartTotalAmout);
            console.log("count:");
            console.log(state.cartTotlQuantity)


        }
        , clearCartt(state) {
            state.cartItem = [];
        }
    }

});

//extracting actions reducers
export const { addToCartt, decreaseCartt, removeFromCartt, getTotals, clearCartt } = cartDataSlice.actions;
export default cartDataSlice.reducer;