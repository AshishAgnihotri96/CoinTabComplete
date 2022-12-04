import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
	userLoginReducer,
	
	userDetailsReducer,
	userUpdateProfileReducer,

} from './reducers/userReducers'


const reducer = combineReducers({

	userLogin: userLoginReducer,
	
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,

	
})


// Get userInfo from local storage
const userInfoFromStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null
// Get shippingAddress from local storage

// Get paymentMethod from local storage


// Create initial state
const initialState = {

	userLogin: { userInfo: userInfoFromStorage },
}

// Set middleware to thunk middleware
const middleware = [thunk]

// Create store
// Pass initial state to load things at that point
// Setup redux-devtools-extension
const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
)

export default store
