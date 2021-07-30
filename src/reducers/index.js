import { combineReducers } from 'redux'
import postsAndCommentsReducer from './postsAndCommentsReducer'
import usersReducer from './usersReducer'

const rootReducer = combineReducers({
    posts: postsAndCommentsReducer,
    users: usersReducer
})

export default rootReducer;