const redux = require('redux')

const initialState = {

}

const reducer = (state = initialState, action) => {
    return state
}

const store = redux.createStore(reducer);
console.log(store.getState())