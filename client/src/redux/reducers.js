import { 
    GET_EMPLOYEES, 
    GET_EMPLOYEES_BY_ID, 
    LOG_OUT ,
    GET_INVOICE_BY_ID,
    GET_INVOICES_BY_SELLER,
    GET_INVOICES_LASTWEEK,
    PATCH_PAYMENT_METHOD,
    GET_INVOICES_LASTMONTH
} from "./actions";

const intialState = {
    employees: [],
    user: [],
    invoice: {},
    seller_invoices: [],
    all_invoices_by_seller: []
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
                user: action.payload,
                seller_invoices: [],
                employees: [],
                invoice: {},
                all_invoices_by_seller: []
            }
        
        case GET_INVOICE_BY_ID:
            return {
                ...state,
                invoice: action.payload
            }
        case GET_INVOICES_BY_SELLER:
            return {
                ...state,
                all_invoices_by_seller: action.payload,
                seller_invoices: action.payload
            }
        case PATCH_PAYMENT_METHOD:
            return {
                ...state,
                invoice: action.payload
                }
        case GET_INVOICES_LASTWEEK:
            return {
                ...state,
                seller_invoices: action.payload
            }
        case GET_INVOICES_LASTMONTH:
            return {
                ...state,
                seller_invoices: action.payload
            }
        
        default:
            return {
                ...state
            }
    }
}

export default rootReducer