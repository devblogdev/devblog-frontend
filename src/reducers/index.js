import { combineReducers } from 'redux'
import postsAndCommentsReducer from './postsAndCommentsReducer'
import usersReducer from './usersReducer'
import imagesReducer from './imagesReducer'

const rootReducer = combineReducers({
    posts: postsAndCommentsReducer,
    users: usersReducer,
    images: imagesReducer
})

export default rootReducer;