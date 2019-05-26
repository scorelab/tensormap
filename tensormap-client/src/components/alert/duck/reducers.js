import {types} from './types'

export const alertReducer = (state = {}, action) => {
    switch (action.type) {
        case types.SUCCESS:
            return {
                type   : 'alertReducer-success',
                message: action.message
            }
        case types.ERROR:
            return {
                type   : 'alertReducer-danger',
                message: action.message
            }
        case types.CLEAR:
            return {}
        default:
            return state
    }
}
