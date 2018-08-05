import {ADD_POST, GET_ERRORS, GET_POSTS, DELETE_POST, LIKE_POST, GET_POST, CLEAR_ERRORS} from './types';
import axios from 'axios';

// add post
export const addPost = (postData) => dispatch => {
  dispatch(clearErrors());
  axios.post('/api/posts', postData, {headers: {"Authorization": localStorage.getItem('jwtToken')}})
    .then(res => dispatch({
      type: ADD_POST,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
}

// get all posts
export const getPosts = () => dispatch => {
  axios.get('/api/posts')
    .then(res => dispatch({
      type: GET_POSTS,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
}

// delete post
export const deletePost = (id) => dispatch => {
  if(window.confirm("Are you sure to delete this post?")) {
    axios.delete(`/api/posts/${id}`, {headers: {"Authorization": localStorage.getItem('jwtToken')}})
      .then(res => dispatch({
        type: DELETE_POST,
        payload: id
      }))
      .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }));
  }
}

// like and unlike post
export const likePost = (id) => dispatch => {
  axios.post(`/api/posts/like/${id}`, null, {headers: {"Authorization": localStorage.getItem('jwtToken')}})
    .then(res => dispatch({
      type: LIKE_POST,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
}

// get single post
export const displayPost = (id) => dispatch => {
  axios.get(`/api/posts/${id}`)
    .then(res => dispatch({
      type: GET_POST,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
}

// add comment to post
export const addComment = (commentData, id) => dispatch => {
  dispatch(clearErrors());
  axios.post(`/api/posts/comment/${id}`, commentData, {headers: {"Authorization": localStorage.getItem('jwtToken')}})
    .then(res => dispatch({
      type: GET_POST,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
}

// delete comment
export const deleteComment = (post_id, comment_id) => dispatch => {
  if(window.confirm("Are you sure you want to delete thic comment?")) {
    axios.delete(`/api/posts/comment/${post_id}/${comment_id}`, {headers: {"Authorization": localStorage.getItem('jwtToken')}})
      .then(res => dispatch({
        type: GET_POST,
        payload: res.data
      }))
      .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }));
  }
}

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
}