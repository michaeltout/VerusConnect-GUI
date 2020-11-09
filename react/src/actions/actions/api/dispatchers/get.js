import { GET_GET_TICKET, SELECT_GET_WINNER } from '../../../../util/constants/storeType'

export const selectGetWinner = (dispatch) => dispatch({
  type: SELECT_GET_WINNER
})

export const getGetTicket = (dispatch) => {
  const ticket = new Date().valueOf();

  dispatch({
    type: GET_GET_TICKET,
    payload: {
      ticket
    }
  })

  return ticket
}