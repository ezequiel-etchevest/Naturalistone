import { 
    GET_EMPLOYEES, 
    GET_EMPLOYEES_BY_ID, 
    LOG_OUT ,
    GET_INVOICE_BY_ID,
    GET_INVOICES_BY_SELLER,
    GET_INVOICES_LASTWEEK,
    PATCH_PAYMENT_METHOD,
    GET_INVOICES_LASTMONTH,
    GET_FILTERED_INVOICES,
    GET_ALL_PRODUCTS,
    GET_PRODUCTS_BY_ID
} from "./actions";

const intialState = {
    employees: [],
    user: [],
    invoice: {},
    seller_invoices: [],
    filtered_invoices: [],
    all_invoices_by_seller: [],
    filtered_invoices_month_week: [],
    allProducts: [],
    // productsByID: []
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
                user: [],
                employees: [],
                invoice: {},
                all_invoices_by_seller: [],
                seller_invoices: [],
                filtered_invoices: [],
                filtered_invoices_month_week: [],
            }
        
        case GET_INVOICE_BY_ID:
            return {
                ...state,
                invoice: action.payload
            }
        case GET_INVOICES_BY_SELLER:
            return {
                ...state,
                seller_invoices: action.payload,
                filtered_invoices_month_week: action.payload,
                all_invoices_by_seller: action.payload
            }
        case PATCH_PAYMENT_METHOD:
            return {
                ...state,
                invoice: action.payload
                }
        case GET_INVOICES_LASTWEEK:
            return {
                ...state,
                seller_invoices: action.payload,
                filtered_invoices_month_week: action.payload
            }
        case GET_INVOICES_LASTMONTH:
            return {
                ...state,
                seller_invoices: action.payload,
                filtered_invoices_month_week: action.payload
            }
        case GET_FILTERED_INVOICES:
            return {
                ...state,
                seller_invoices: action.payload,
                filtered_invoices: action.payload
            }
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                allProducts: action.payload,
            }
        // case GET_PRODUCTS_BY_ID:
        //     return {
        //         ...state,
        //         productsByID: action.payload,
        //     }
            
        
        default:
            return {
                ...state
            }
    }
}

export default rootReducer