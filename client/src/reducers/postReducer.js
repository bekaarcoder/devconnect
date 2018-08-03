import {ADD_POST, GET_POSTS, DELETE_POST, LIKE_POST, GET_POST} from '../actions/types';

const initialState = {
  posts: [],
  post: {},
  loading: false
}

export default function(state = initialState, action) {
  switch(action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload,...state.posts]
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      }
    case LIKE_POST:
      state.posts.splice(state.posts.map(post => post._id.toString()).indexOf(action.payload._id.toString()), 1, action.payload);
      return {
        ...state,
        posts: state.posts 
      }
    case GET_POST:
      return {
        ...state,
        post: action.payload
      }
    default:
      return state;
  }
}