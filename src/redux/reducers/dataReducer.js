import {
  SET_REACTIONS,
  LIKE_REACTION,
  UNLIKE_REACTION,
  LOADING_DATA,
  DELETE_REACTION,
  POST_REACTION,
  SET_REACTION,
  SUBMIT_COMMENT,
} from '../types';

const initialState = {
  reactions: [],
  reaction: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_REACTIONS:
      return {
        ...state,
        reactions: action.payload,
        loading: false,
      };
    case SET_REACTION:
      return {
        ...state,
        reaction: action.payload,
        loading: false,
      };
    case LIKE_REACTION:
    case UNLIKE_REACTION:
      let index = state.reactions.findIndex(
        (reaction) => reaction.reactionId === action.payload.reactionId
      );
      state.reactions[index] = action.payload;
      if (state.reaction.reactionId === action.payload.reactionId) {
        state.reaction = action.payload;
      }
      return {
        ...state,
      };
    case DELETE_REACTION:
      let deletedIndex = state.reactions.findIndex(
        (reaction) => reaction.reactionId === action.payload
      );
      state.reactions.splice(deletedIndex, 1);
      return {
        ...state,
      };
    case POST_REACTION:
      return {
        ...state,
        reactions: [action.payload, ...state.reactions],
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        reaction: {
          ...state.reaction,
          comments: [action.payload, ...state.reaction.comments],
        },
      };
    default:
      return state;
  }
}
