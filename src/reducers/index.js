import { combineReducers } from 'redux'
import postsAndCommentsReducer from './postsAndCommentsReducer'

const rootReducer = combineReducers({
    posts: postsAndCommentsReducer
})

export default rootReducer;