import { GET_EMPLOYEES } from "./actions"


const intialState = {
    employees: []
}

function rootReducer (state = intialState, action) {
    switch(action.type){
        case GET_EMPLOYEES:
            return {
                ...state,
                employees: action.payload
            }
    }
}

export default rootReducer