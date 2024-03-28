import { notification } from 'antd'

const LOAD_CALENDAR = 'LOAD_CALENDAR'
const GET_ALL_CALENDAR_EVENTS = 'GET_ALL_CALENDAR_EVENTS'

const rootReducer = (state = { data: {}, loading: false }, action) => {
  switch (action.type) {
    case LOAD_CALENDAR:
      return { data: {}, loading: true }
    case GET_ALL_CALENDAR_EVENTS:
      return { data: action.data, loading: false }
    default:
      return state
  }
}

export default rootReducer
