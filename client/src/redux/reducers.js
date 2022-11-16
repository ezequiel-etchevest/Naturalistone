import { 
    GET_EMPLOYEES, 
    GET_EMPLOYEES_BY_ID, 
    LOG_OUT ,
    GET_INVOICE_BY_ID,
    GET_INVOICES_BY_SELLER,
    GET_CURRENT_INVOICES
} from "./actions";

const intialState = {
    employees: [],
    user: [],
    invoice: {},
    seller_invoices: [],
    current_invoices: []
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
        case LOG_OUT:
            return {
                ...state,
                user: action.payload
            }
        
        case GET_INVOICE_BY_ID:
            return {
                ...state,
                invoice: action.payload
            }
        case GET_INVOICES_BY_SELLER:
            return {
                ...state,
                seller_invoices: action.payload
            }
        // case GET_CURRENT_INVOICES:
        //     return {
        //         ...state,
        //         current_invoices: action.payload
        //     }
        
        default:
            return {
                ...state
            }
    }
}

export default rootReducer