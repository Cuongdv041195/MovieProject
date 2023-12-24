import { combineReducers } from 'redux'
import { movieShowtimesReducer } from './Booking/slice'

export const rootReducer = combineReducers({
  movieShowtimesReducer,
})
