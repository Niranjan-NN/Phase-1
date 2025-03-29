const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";


const Reducer = (state, action) => {
  switch (action.type) {
    case INCREMENT:
      return { count: state.count + 1 };
    case DECREMENT:
      return { count: state.count - 1 };
    default:
      return state;
  }
};

export { Reducer, INCREMENT, DECREMENT };
