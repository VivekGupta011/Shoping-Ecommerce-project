
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const fetchFromLocalStorage = () => {
    let Cart = localStorage.getItem("cartData");
    if (Cart !== undefined) {

        console.log("CartData:");
        console.log(JSON.parse(localStorage.getItem("cartData")));
        console.log(localStorage.getItem("cartData"))
        console.log("d");
        return JSON.parse(localStorage.getItem("cartData"));
    } else {
        return [];
    }
}

const storeInLocalStorage = (data) => {
    console.log("setItem:");
    console.log(JSON.stringify(data));
    console.log("setItem:");
    localStorage.setItem("cartData", JSON.stringify(data));
}

// Testing
localStorage.setItem("Testing", JSON.stringify([{ name: "vivek", last: "gupta" }]))
// storeInLocalStorage();
console.log("localStorage:");






// Main code

const initialState = {
    cartItem: fetchFromLocalStorage(),
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
                toast.info("Increased product quantity", {
                    position: "bottom-left",
                });
            } else {
                let tempProductItem = { ...action.payload, cartQuantity: 1 };
                state.cartItem.push(tempProductItem);
                toast.success("Product added to cart", {
                    position: "bottom-left",
                });
            }
            storeInLocalStorage(state.cartItem);
        },
        decreaseCartt(state, action) {
            // console.log("Datatt:");
            // alert("hello");
            const itemIndex = state.cartItem.findIndex((item) => item.id === action.payload);
            // let tempProductItem = { ...action.payload, cartQuantity: 1 };
            if (state.cartItem[itemIndex].cartQuantity > 1) {
                state.cartItem[itemIndex].cartQuantity -= 1;
                toast.info("Decreased product quantity", {
                    position: "bottom-left",
                });
            } else if (state.cartItem[itemIndex].cartQuantity === 1) {
                const nextCartItems = state.cartItem.filter((item) => item.id !== action.payload);
                state.cartItem = nextCartItems;
                toast.error("Product removed from cart", {
                    position: "bottom-left",
                });
            }

            storeInLocalStorage(state.cartItem);
        },
        removeFromCartt(state, action) {
            const items = state.cartItem.filter((item) => item.id !== action.payload.id);
            state.cartItem = items;
            storeInLocalStorage(state.cartItem);
            toast.error("Product removed from cart", {
                position: "bottom-left",
            });

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
            state.cartTotlQuantity = quantity;
            console.log("total rs;");
            console.log(state.cartTotalAmout);
            console.log("count:");
            console.log(state.cartTotlQuantity)
            // alert("hello Vivek!");


        }
        , clearCartt(state) {
            state.cartItem = [];
            storeInLocalStorage(state.cartItem);
            toast.error("Cart cleared", { position: "bottom-left" });
        }
    }

});

//extracting actions reducers
export const { addToCartt, decreaseCartt, removeFromCartt, getTotals, clearCartt } = cartDataSlice.actions;
export default cartDataSlice.reducer;