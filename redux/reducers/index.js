import { combineReducers } from 'redux';

import posts from './posts.js';
import user from './user.js';

const reducers = combineReducers({ 
    posts,
    user
});

export default reducers