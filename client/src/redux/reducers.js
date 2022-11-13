import { GET_EMPLOYEES } from "./actions";
import { GET_EMPLOYEES_BY_ID } from "./actions";


const intialState = {
    employees: [],
    user: []
}

function rootReducer (state = intialState, action) {
    switch(action.type){
        case GET_EMPLOYEES:
            return {
                ...state,
                employees: action.payload
            }
        case GET_EMPLOYEES_BY_ID:
            return {
                ...state,
                user: action.payload
            }
    }
}

export default rootReducer