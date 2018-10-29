const MESSAGE = 'MESSAGE'

const initialState = {
  message: 'Hello World'
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case MESSAGE:
      return { ...state, ...{ message: action.payload } }
    default:
      return state
  }
}

export default rootReducer
