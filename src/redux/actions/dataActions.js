import {
  SET_REACTIONS,
  LOADING_DATA,
  LIKE_REACTION,
  UNLIKE_REACTION,
  DELETE_REACTION,
  LOADING_UI,
  POST_REACTION,
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_REACTION,
  STOP_LOADING_UI,
  SUBMIT_COMMENT,
} from '../types';
import axios from 'axios';

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
export const getReactions = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get('/reactions')
    .then((res) => {
      dispatch({ type: SET_REACTIONS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SET_REACTIONS, payload: [] });
    });
};

export const getReaction = (reactionId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/reaction/${reactionId}`)
    .then((res) => {
      dispatch({ type: SET_REACTION, payload: res.data });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};

export const postReaction = (newReaction) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/reaction', newReaction)
    .then((res) => {
      dispatch({ type: POST_REACTION, payload: res.data });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const likeReaction = (reactionId) => (dispatch) => {
  axios
    .get(`/reaction/${reactionId}/like`)
    .then((res) => {
      dispatch({ type: LIKE_REACTION, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const unlikeReaction = (reactionId) => (dispatch) => {
  axios
    .get(`/reaction/${reactionId}/unlike`)
    .then((res) => {
      dispatch({ type: UNLIKE_REACTION, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const submitComment = (reactionId, commentData) => (dispatch) => {
  axios
    .post(`/reaction/${reactionId}/comment`, commentData)
    .then((res) => {
      dispatch({ type: SUBMIT_COMMENT, payload: res.data });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const deleteReaction = (reactionId) => (dispatch) => {
  axios
    .delete(`/reaction/${reactionId}`)
    .then(() => {
      dispatch({ type: DELETE_REACTION, payload: reactionId });
    })
    .catch((err) => console.log(err));
};

export const getSingleUserData = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userHandle}`)
    .then((res) => {
      dispatch({ type: SET_REACTIONS, payload: res.data.reactions });
    })
    .catch(() => {
      dispatch({ type: SET_REACTIONS, payload: null });
    });
};
