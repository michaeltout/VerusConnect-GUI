import { SELECT_POST_WINNER, GET_POST_TICKET } from '../../../../util/constants/storeType'

export const selectPostWinner = (dispatch) => dispatch({
  type: SELECT_POST_WINNER
})

export const getPostTicket = (dispatch) => {
  const ticket = new Date().valueOf();

  dispatch({
    type: GET_POST_TICKET,
    payload: {
      ticket
    }
  })

  return ticket
}