/*
  The coin reducer conatains management data for api calls 
  to the main backend process
*/

import {
  GET_POST_TICKET,
  SELECT_POST_WINNER,
  GET_GET_TICKET,
  SELECT_GET_WINNER
} from "../util/constants/storeType";

export const api = (state = {
  postWinner: null,
  postTickets: [],
  getWinner: null,
  getTickets: []
}, action) => {
  switch (action.type) {
    case SELECT_POST_WINNER:
      const postWinner = state.postTickets[0]

      return {
        ...state,
        postWinner,
        postTickets: state.postTickets.filter(x => x !== postWinner)
      };
    case SELECT_GET_WINNER:
      const getWinner = state.getTickets[0]

      return {
        ...state,
        getWinner,
        getTickets: state.getTickets.filter(x => x !== getWinner)
      };
    case GET_POST_TICKET:
      return {
        ...state,
        postWinner: state.postWinner == null ? action.payload.ticket : state.postWinner,
        postTickets: state.postWinner == null ? state.postTickets : [...state.postTickets, action.payload.ticket]
      };
    case GET_GET_TICKET:
      return {
        ...state,
        getWinner: state.getWinner == null ? action.payload.ticket : state.getWinner,
        getTickets: state.getWinner == null ? state.getTickets : [...state.getTickets, action.payload.ticket]
      };
    default:
      return state;
  }
}