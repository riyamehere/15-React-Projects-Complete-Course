//The useReducer Hook returns the current stateand a dispatchmethod.
const reducer = (state, action) => {
  if (action.type === "CLEAR_CART") {
    //empty the cart array
    return { ...state, cart: [] };
  }
  if (action.type === "REMOVE") {
    return {
      ...state,
      cart: state.cart.filter((cartItem) => cartItem.id !== action.payload), //passing the d in the payload and checking if id do not match then that item will be returned
    };
  }
  if (action.type === "INCREASE") {
    //iterate over the cart
    let tempCart = state.cart.map((cartItem) => {
      //action,.payload is the id that we are passing in, if it matches then increment the amount
      if (cartItem.id === action.payload) {
        return { ...cartItem, amount: cartItem.amount + 1 };
      }
      return cartItem;
    });
    return { ...state, cart: tempCart };
  }
  if (action.type === "DECREASE") {
    let tempCart = state.cart
      .map((cartItem) => {
        //action,.payload is the id that we are passing in, if it matches then decrement the amount
        if (cartItem.id === action.payload) {
          //...cartItem means all the items shoulde be returned same
          return { ...cartItem, amount: cartItem.amount - 1 };
        }
        return cartItem;
      })
      //only return the item if amount is not 0, otherwise dont return it (remove it)
      .filter((cartItem) => cartItem.amount !== 0);
    return { ...state, cart: tempCart };
  }
  if (action.type === "GET_TOTALS") {
    //setting up the reduce funtion
    //it will return an object
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        //getting the price and amount
        const { price, amount } = cartItem;
        const itemTotal = price * amount;

        cartTotal.total += itemTotal;
        cartTotal.amount += amount;
        return cartTotal;
      },
      {
        total: 0,
        amount: 0,
      }
    );
    total = parseFloat(total.toFixed(2));

    return { ...state, total, amount };
  }
  if (action.type === "LOADING") {
    return { ...state, loading: true };
  }
  if (action.type === "DISPLAY_ITEMS") {
    return { ...state, cart: action.payload, loading: false };
  }
  //2nd option -> setting up both increase and decrease function in one function
  if (action.type === "TOGGLE_AMOUNT") {
    let tempCart = state.cart
      .map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          if (action.payload.type === "inc") {
            return { ...cartItem, amount: cartItem.amount + 1 };
          }
          if (action.payload.type === "dec") {
            return { ...cartItem, amount: cartItem.amount - 1 };
          }
        }
        return cartItem;
      })
      .filter((cartItem) => cartItem.amount !== 0);
    return { ...state, cart: tempCart };
  }
  throw new Error("no matching action type");
};

export default reducer;
